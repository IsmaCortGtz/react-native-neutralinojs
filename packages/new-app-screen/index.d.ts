import * as React from 'react';
import type { TextProps, TextStyle } from 'react-native';

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

export declare const COLORS: ColorsRecord;
export declare const Colors: ColorTheme;

export interface LinkItem {
  title: string;
  description: string;
  url: string;
}

export declare const Links: LinkItem[];

export declare function useTheme(): {
  colors: ColorTheme;
};

export interface ThemedTextProps extends TextProps {
  color?: 'primary' | 'secondary';
  style?: TextStyle | TextStyle[];
  children?: React.ReactNode;
}

export declare function ThemedText(props: ThemedTextProps): React.JSX.Element;

export interface HeaderProps {
  templateFileName?: string;
}

export declare function Header(props: HeaderProps): React.JSX.Element;

export declare function LearnMoreLinks(): React.JSX.Element;

export declare function ReloadInstructions(): React.JSX.Element;

export declare function DebugInstructions(): React.JSX.Element;

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

export declare function NewAppScreen(props: NewAppScreenProps): React.JSX.Element;

export default NewAppScreen;

