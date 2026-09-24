import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import fs from 'node:fs';
import loadViteConfig from '@/vite/loadConfig';

describe('vite/loadConfig', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return empty object if no vite config exists in target directory', async () => {
    vi.spyOn(fs, 'existsSync').mockReturnValue(false);
    const config = await loadViteConfig('non-existent-directory');
    expect(config).toEqual({});
  });

  it('should return empty object if loading fails with an error', async () => {
    vi.spyOn(fs, 'existsSync').mockImplementation(() => {
      throw new Error('File read failure');
    });

    const config = await loadViteConfig();
    expect(config).toEqual({});
  });
});
