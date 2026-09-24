import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getFiglet, printHeader } from '@/utils/art';

describe('utils/art', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('getFiglet', () => {
    it('should return ASCII art string', () => {
      const art = getFiglet();
      expect(typeof art).toBe('string');
      expect(art).toContain('___');
      expect(art.length).toBeGreaterThan(50);
    });
  });

  describe('printHeader', () => {
    it('should call console.log with welcome message and figlet', () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      
      printHeader();

      expect(consoleSpy).toHaveBeenCalledTimes(2);
      expect(consoleSpy.mock.calls[0][0]).toContain('Welcome to react-native-neutralinojs');
    });
  });
});
