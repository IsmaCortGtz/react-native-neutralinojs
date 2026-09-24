import * as React from 'react';
import { Image, ReactNativeVersion, StyleSheet, Text, View, useColorScheme } from 'react-native';
import { ThemedText, useTheme } from '../Theme';
import type { HeaderProps } from '../types';

const darkLogo = require('../../assets/react-dark.png');
const lightLogo = require('../../assets/react-light.png');

const reactDarkImage = darkLogo?.default || darkLogo;
const reactLightImage = lightLogo?.default || lightLogo;

export function Header({ templateFileName = 'App.tsx' }: HeaderProps): React.JSX.Element {
  const { colors } = useTheme();
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={styles.header}>
      <Image style={styles.logo} source={isDarkMode ? reactDarkImage : reactLightImage} />
      <ThemedText style={styles.title}>Welcome to React Native + Neutralino!</ThemedText>
      {getVersionLabel()}
      {getHermesLabel()}
      <ThemedText style={[styles.callout, { backgroundColor: colors.backgroundHighlight }]}>
        💡&ensp;Open <Text style={styles.calloutEmphasis}>{templateFileName}</Text> to get started
      </ThemedText>
    </View>
  );
}

function getVersionLabel(): React.JSX.Element {
  const versionString = ReactNativeVersion?.getVersionString?.() || '0.0.0';
  return (
    <ThemedText color="secondary" style={styles.label}>
      Version: {versionString}
    </ThemedText>
  );
}

function getHermesLabel(): React.JSX.Element | null {
  if (typeof globalThis !== 'undefined' && (globalThis as any).HermesInternal == null) {
    return null;
  }

  return (
    <ThemedText color="secondary" style={styles.label}>
      JS Engine: Hermes
    </ThemedText>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    alignItems: 'center',
    marginTop: 64,
    marginBottom: 48,
  },
  logo: {
    height: 80,
    aspectRatio: 1,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
  },
  callout: {
    width: '100%',
    maxWidth: 320,
    marginTop: 36,
    paddingVertical: 16,
    paddingHorizontal: 20,
    paddingLeft: 16,
    borderRadius: 12,
    fontSize: 16,
    textAlign: 'center',
  },
  calloutEmphasis: {
    fontWeight: 'bold',
  },
});

export default Header;
