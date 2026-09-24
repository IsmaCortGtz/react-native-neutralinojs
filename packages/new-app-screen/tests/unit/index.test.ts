import { describe, it, expect, vi } from 'vitest';

vi.mock('../../src/components/Header', () => ({
  Header: () => 'Header',
  default: () => 'Header',
}));

vi.mock('react-native', () => ({
  Text: 'Text',
  View: 'View',
  Image: 'Image',
  ScrollView: 'ScrollView',
  StyleSheet: { create: (styles: any) => styles },
  useColorScheme: vi.fn().mockReturnValue('light'),
  Platform: { OS: 'neu', select: (obj: any) => obj.neu || obj.default },
  Linking: { openURL: vi.fn() },
  ReactNativeVersion: { getVersionString: () => '1.0.0' },
}));

import * as IndexExports from '../../src/index';

describe('new-app-screen index exports', () => {
  it('should export all primary components and utilities', () => {
    expect(IndexExports.NewAppScreen).toBeDefined();
    expect(IndexExports.Header).toBeDefined();
    expect(IndexExports.LearnMoreLinks).toBeDefined();
    expect(IndexExports.ReloadInstructions).toBeDefined();
    expect(IndexExports.DebugInstructions).toBeDefined();
    expect(IndexExports.COLORS).toBeDefined();
    expect(IndexExports.Colors).toBeDefined();
    expect(IndexExports.useTheme).toBeDefined();
    expect(IndexExports.ThemedText).toBeDefined();
    expect(IndexExports.Links).toBeDefined();
    expect(IndexExports.LinksList).toBeDefined();
    expect(IndexExports.default).toBe(IndexExports.NewAppScreen);
  });
});
