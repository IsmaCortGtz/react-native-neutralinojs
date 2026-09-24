import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import logger, { log, error, warn, raw } from '@/utils/log';

describe('utils/log', () => {
  let consoleSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should log info messages with Info badge', () => {
    log('test info message', 123);
    expect(consoleSpy).toHaveBeenCalledTimes(1);
    expect(consoleSpy.mock.calls[0][0]).toContain('Info');
    expect(consoleSpy.mock.calls[0][1]).toBe('test info message');
    expect(consoleSpy.mock.calls[0][2]).toBe(123);
  });

  it('should log error messages with Error badge', () => {
    error('failed to build', new Error('test'));
    expect(consoleSpy).toHaveBeenCalledTimes(1);
    expect(consoleSpy.mock.calls[0][0]).toContain('Error');
    expect(consoleSpy.mock.calls[0][1]).toBe('failed to build');
  });

  it('should log warn messages with warn badge', () => {
    warn('warning message');
    expect(consoleSpy).toHaveBeenCalledTimes(1);
    expect(consoleSpy.mock.calls[0][0]).toContain('warn');
    expect(consoleSpy.mock.calls[0][1]).toBe('warning message');
  });

  it('should log raw messages without prefix formatting', () => {
    raw('raw output', { a: 1 });
    expect(consoleSpy).toHaveBeenCalledTimes(1);
    expect(consoleSpy.mock.calls[0][0]).toBe('raw output');
    expect(consoleSpy.mock.calls[0][1]).toEqual({ a: 1 });
  });

  it('should export methods on default object', () => {
    expect(logger.log).toBe(log);
    expect(logger.error).toBe(error);
    expect(logger.warn).toBe(warn);
    expect(logger.raw).toBe(raw);
  });
});
