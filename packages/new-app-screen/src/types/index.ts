import type * as React from 'react';
import type { StyleProp, TextProps, TextStyle } from 'react-native';

export interface ColorTheme {
  background: string;
  backgroundHighlight: string;
  cardBackground: string;
  cardOutline: string;
  textPrimary: string;
  textSecondary: string;
  primary: string;
  white: string;
  lighter: string;
  light: string;
  dark: string;
  darker: string;
  black: string;
}

export interface ColorsRecord {
  light: ColorTheme;
  dark: ColorTheme;
}

export interface Theme {
  colors: ColorTheme;
}

export interface LinkItem {
  title: string;
  description: string;
  url: string;
}

export interface ThemedTextProps extends TextProps {
  color?: 'primary' | 'secondary';
  style?: StyleProp<TextStyle>;
  children?: React.ReactNode;
}

export interface HeaderProps {
  templateFileName?: string;
}

export interface SafeAreaInsets {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
}

export interface NewAppScreenProps {
  templateFileName?: string;
  safeAreaInsets?: SafeAreaInsets;
}
