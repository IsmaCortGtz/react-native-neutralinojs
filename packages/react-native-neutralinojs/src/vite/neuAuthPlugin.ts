import http from 'node:http';
import type { IndexHtmlTransformContext } from 'vite';
import type { NeutralinoDevServer } from '@/types/Vite';

export function neuAuthPlugin() {
  return {
    name: 'neu-auth-plugin',
    transformIndexHtml(html: string, ctx: IndexHtmlTransformContext) {
      const url = new URL(ctx.originalUrl || ctx.path, 'http://localhost');  
      const id = url.searchParams.get('neutralinoReactNativeUid');  
      if (!id) return html;

      return html.replace(
        /src\s*=\s*(['"])\s*\/__neutralino_globals\.js\s*\1/g,
        `src="/__neutralino_globals.js?neutralinoReactNativeUid=${id}"`
      );
    }  
  }
}

export function netAuthProxyPlugin() {
  return {
    name: 'net-auth-proxy-plugin',
    configureServer(server: NeutralinoDevServer) {
      server.middlewares.use((req, res, next) => {
        if (req?.url?.includes('/__neutralino_globals.js')) {
          const url = new URL(req.url, `http://localhost`);
          const id = url.searchParams.get('neutralinoReactNativeUid');
          if (!id) return next();

          const port = server?.neutralinoAuthPorts?.[id];
          if (!port) return next();

          const proxyUrl = `http://localhost:${port}/__neutralino_globals.js`;
          return http.get(proxyUrl, (proxyRes) => {
            res.writeHead(proxyRes.statusCode || 200, proxyRes.statusMessage || 'OK', proxyRes.headers);
            proxyRes.pipe(res);
          }).on('error', (err) => {
            res.statusCode = 500;
            res.end(err.message);
          });
        }

        next();
      });
    }
  }
}