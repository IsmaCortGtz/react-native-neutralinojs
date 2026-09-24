import { describe, it, expect, vi } from 'vitest';

vi.mock('react-native', () => ({
  Text: 'Text',
  useColorScheme: vi.fn().mockReturnValue('light'),
}));

import { COLORS, Colors, useTheme, ThemedText } from '../../src/Theme';

describe('new-app-screen Theme', () => {
  it('should define both light and dark color themes', () => {
    expect(COLORS).toHaveProperty('light');
    expect(COLORS).toHaveProperty('dark');
  });

  it('should have all required color keys in light and dark palettes', () => {
    const requiredKeys = [
      'background',
      'backgroundHighlight',
      'cardBackground',
      'cardOutline',
      'textPrimary',
      'textSecondary',
      'primary',
      'white',
      'lighter',
      'light',
      'dark',
      'darker',
      'black',
    ];

    requiredKeys.forEach((key) => {
      expect(COLORS.light).toHaveProperty(key);
      expect(COLORS.dark).toHaveProperty(key);
    });
  });

  it('should default Colors to the light theme', () => {
    expect(Colors).toBe(COLORS.light);
  });

  it('should have contrasting background colors for light and dark schemes', () => {
    expect(COLORS.light.background).not.toBe(COLORS.dark.background);
    expect(COLORS.light.textPrimary).not.toBe(COLORS.dark.textPrimary);
  });

  it('should return theme based on useColorScheme hook', () => {
    const theme = useTheme();
    expect(theme.colors).toEqual(COLORS.light);
  });

  it('should export ThemedText component', () => {
    expect(typeof ThemedText).toBe('function');
  });
});
