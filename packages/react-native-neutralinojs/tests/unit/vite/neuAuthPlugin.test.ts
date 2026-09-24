import { describe, it, expect, vi } from 'vitest';
import { neuAuthPlugin, netAuthProxyPlugin } from '@/vite/neuAuthPlugin';

describe('vite/neuAuthPlugin', () => {
  describe('neuAuthPlugin', () => {
    const plugin = neuAuthPlugin();

    it('should have the correct plugin name', () => {
      expect(plugin.name).toBe('neu-auth-plugin');
    });

    it('should inject neutralinoReactNativeUid into __neutralino_globals.js when present in query', () => {
      const html = '<script src="/__neutralino_globals.js"></script>';
      const ctx: any = { originalUrl: '/?neutralinoReactNativeUid=app_12345' };

      const transformed = plugin.transformIndexHtml(html, ctx);
      expect(transformed).toBe('<script src="/__neutralino_globals.js?neutralinoReactNativeUid=app_12345"></script>');
    });

    it('should not alter html if neutralinoReactNativeUid is not in query', () => {
      const html = '<script src="/__neutralino_globals.js"></script>';
      const ctx: any = { originalUrl: '/' };

      const transformed = plugin.transformIndexHtml(html, ctx);
      expect(transformed).toBe(html);
    });

    it('should use ctx.path if ctx.originalUrl is undefined', () => {
      const html = '<script src="/__neutralino_globals.js"></script>';
      const ctx: any = { path: '/index.html?neutralinoReactNativeUid=sub_path_id' };

      const transformed = plugin.transformIndexHtml(html, ctx);
      expect(transformed).toBe('<script src="/__neutralino_globals.js?neutralinoReactNativeUid=sub_path_id"></script>');
    });
  });

  describe('netAuthProxyPlugin', () => {
    const plugin = netAuthProxyPlugin();

    it('should have the correct plugin name', () => {
      expect(plugin.name).toBe('net-auth-proxy-plugin');
      expect(typeof plugin.configureServer).toBe('function');
    });

    it('should register middleware that calls next() when url does not match globals', () => {
      let middlewareHandler: any;
      const mockServer: any = {
        middlewares: {
          use: vi.fn((fn) => { middlewareHandler = fn; }),
        },
      };

      plugin.configureServer(mockServer);
      expect(mockServer.middlewares.use).toHaveBeenCalledTimes(1);

      const next = vi.fn();
      middlewareHandler({ url: '/index.html' }, {}, next);
      expect(next).toHaveBeenCalledTimes(1);
    });

    it('should call next() if neutralinoReactNativeUid is missing', () => {
      let middlewareHandler: any;
      const mockServer: any = {
        middlewares: {
          use: vi.fn((fn) => { middlewareHandler = fn; }),
        },
      };

      plugin.configureServer(mockServer);

      const next = vi.fn();
      middlewareHandler({ url: '/__neutralino_globals.js' }, {}, next);
      expect(next).toHaveBeenCalledTimes(1);
    });
  });
});
