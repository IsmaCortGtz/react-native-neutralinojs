import { describe, it, expect } from 'vitest';
import Links, { Links as LinksNamed } from '../../src/Links';

describe('new-app-screen Links', () => {
  it('should export an array of link items', () => {
    expect(Array.isArray(Links)).toBe(true);
    expect(Links.length).toBeGreaterThan(0);
    expect(Links).toBe(LinksNamed);
  });

  it('should have valid title, description and url for every link', () => {
    Links.forEach((item) => {
      expect(typeof item.title).toBe('string');
      expect(item.title.length).toBeGreaterThan(0);

      expect(typeof item.description).toBe('string');
      expect(item.description.length).toBeGreaterThan(0);

      expect(typeof item.url).toBe('string');
      expect(item.url).toMatch(/^https:\/\//);
    });
  });

  it('should contain official React Native documentation references', () => {
    const titles = Links.map((l) => l.title);
    expect(titles).toContain('Hello World');
    expect(titles).toContain('Fast Refresh');
    expect(titles).toContain('DevTools');
    expect(titles).toContain('Components');
  });
});
