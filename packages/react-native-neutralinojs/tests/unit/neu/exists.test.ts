import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import fs from 'node:fs';
import { neuExists, binExists } from '@/neu/exists';

describe('neu/exists', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('neuExists', () => {
    it('should return true when both neutralino.config.json and log directory exist', () => {
      vi.spyOn(fs, 'existsSync').mockReturnValue(true);
      expect(neuExists()).toBe(true);
    });

    it('should return false when neutralino.config.json is missing', () => {
      vi.spyOn(fs, 'existsSync').mockImplementation((p) => {
        if (String(p).includes('neutralino.config.json')) return false;
        return true;
      });
      expect(neuExists()).toBe(false);
    });

    it('should return false when log directory is missing', () => {
      vi.spyOn(fs, 'existsSync').mockImplementation((p) => {
        if (String(p).includes('log')) return false;
        return true;
      });
      expect(neuExists()).toBe(false);
    });
  });

  describe('binExists', () => {
    it('should return false if neutralino bin directory does not exist', () => {
      vi.spyOn(fs, 'existsSync').mockReturnValue(false);
      expect(binExists()).toBe(false);
    });

    it('should return true if binary starting with neutralino exists in bin directory', () => {
      vi.spyOn(fs, 'existsSync').mockReturnValue(true);
      vi.spyOn(fs, 'readdirSync').mockReturnValue([
        { name: 'neutralino-linux_x64', isDirectory: () => false },
      ] as any);

      expect(binExists()).toBe(true);
    });

    it('should return false if matching name is a directory', () => {
      vi.spyOn(fs, 'existsSync').mockReturnValue(true);
      vi.spyOn(fs, 'readdirSync').mockReturnValue([
        { name: 'neutralino-linux_x64', isDirectory: () => true },
      ] as any);

      expect(binExists()).toBe(false);
    });

    it('should return false if no file starts with neutralino', () => {
      vi.spyOn(fs, 'existsSync').mockReturnValue(true);
      vi.spyOn(fs, 'readdirSync').mockReturnValue([
        { name: 'other-binary', isDirectory: () => false },
      ] as any);

      expect(binExists()).toBe(false);
    });
  });
});
