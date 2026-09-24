import * as React from 'react';
import { Text, useColorScheme } from 'react-native';
import type { ColorTheme, ColorsRecord, Theme, ThemedTextProps } from './types';

export const COLORS: ColorsRecord = {
  light: {
    background: '#f3f3f3',
    backgroundHighlight: '#cfe6ee',
    cardBackground: '#fff',
    cardOutline: '#dae1e7',
    textPrimary: '#000',
    textSecondary: '#404756',
    primary: '#1292B4',
    white: '#FFF',
    lighter: '#F3F3F3',
    light: '#DAE1E7',
    dark: '#444',
    darker: '#222',
    black: '#000',
  },
  dark: {
    background: '#000',
    backgroundHighlight: '#193c47',
    cardBackground: '#222',
    cardOutline: '#444',
    textPrimary: '#fff',
    textSecondary: '#c0c1c4',
    primary: '#1292B4',
    white: '#FFF',
    lighter: '#F3F3F3',
    light: '#DAE1E7',
    dark: '#444',
    darker: '#222',
    black: '#000',
  },
};

export const Colors: ColorTheme = COLORS.light;

export function useTheme(): Theme {
  const colorScheme = useColorScheme();

  return {
    colors: COLORS[colorScheme === 'dark' ? 'dark' : 'light'],
  };
}

export function ThemedText({ color, style, ...props }: ThemedTextProps): React.JSX.Element {
  const { colors } = useTheme();

  return (
    <Text
      style={[
        {
          color: color === 'secondary' ? colors.textSecondary : colors.textPrimary,
        },
        style,
      ]}
      {...props}
    />
  );
}
