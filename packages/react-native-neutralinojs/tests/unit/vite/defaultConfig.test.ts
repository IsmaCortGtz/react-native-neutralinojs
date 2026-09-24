import { describe, it, expect } from 'vitest';
import defaultViteConfig from '@/vite/defaultConfig';

describe('vite/defaultConfig', () => {
  it('should return default vite configuration with expected properties', async () => {
    const config = await defaultViteConfig();

    expect(config).toHaveProperty('root', 'neutralino');
    expect(config).toHaveProperty('logLevel', 'warn');
    expect(config.build).toEqual({ outDir: 'vite-dist' });
    expect(config.server).toEqual({ port: 8082 });
    expect(Array.isArray(config.plugins)).toBe(true);
    expect(config.plugins?.length).toBeGreaterThanOrEqual(3);
  });
});
