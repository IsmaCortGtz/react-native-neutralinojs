import { describe, it, expect } from 'vitest';
import findPort from '@/utils/findPort';

describe('utils/findPort', () => {
  it('should find an available port number', async () => {
    const port = await findPort();
    expect(typeof port).toBe('number');
    expect(port).toBeGreaterThan(0);
    expect(port).toBeLessThan(65536);
  });

  it('should return valid ports on multiple concurrent calls', async () => {
    const ports = await Promise.all([findPort(), findPort(), findPort()]);
    ports.forEach(port => {
      expect(port).toBeGreaterThan(0);
      expect(port).toBeLessThan(65536);
    });
  });
});
