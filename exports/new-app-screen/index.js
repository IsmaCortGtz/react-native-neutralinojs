import * as React from 'react';
import { os } from '@neutralinojs/lib';
import {
  Text,
  ReactNativeVersion,
  useColorScheme,
  Image,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  View,
  useWindowDimensions,
} from 'react-native-neutralinojs';

const COLORS = {
  light: {
    background: '#f3f3f3',
    backgroundHighlight: '#cfe6ee',
    cardBackground: '#fff',
    cardOutline: '#dae1e7',
    textPrimary: '#000',
    textSecondary: '#404756',
  },
  dark: {
    background: '#000',
    backgroundHighlight: '#193c47',
    cardBackground: '#222',
    cardOutline: '#444',
    textPrimary: '#fff',
    textSecondary: '#c0c1c4',
  },
};

const Links = [
  {
    title: 'Hello World',
    description: 'Learn the basics',
    url: 'https://reactnative.dev/docs/tutorial',
  },
  {
    title: 'Fast Refresh',
    description: 'See edits instantly',
    url: 'https://reactnative.dev/docs/fast-refresh',
  },
  {
    title: 'DevTools',
    description: 'View logs & debug your app',
    url: 'https://reactnative.dev/docs/debugging',
  },
  {
    title: 'Components',
    description: 'View components and APIs',
    url: 'https://reactnative.dev/docs/components-and-apis',
  },
  {
    title: 'Style',
    description: 'Use the style prop',
    url: 'https://reactnative.dev/docs/style',
  },
  {
    title: 'Layout',
    description: 'Flexbox & layout techniques',
    url: 'https://reactnative.dev/docs/flexbox',
  },
  {
    title: 'Navigation',
    description: 'Move between screens',
    url: 'https://reactnative.dev/docs/navigation',
  },
  {
    title: 'Networking',
    description: 'Use the Fetch API',
    url: 'https://reactnative.dev/docs/network',
  },
  {
    title: 'Showcase',
    description: 'Featured React Native apps',
    url: 'https://reactnative.dev/showcase',
  },
  {
    title: 'Blog',
    description: 'Latest news & updates',
    url: 'https://reactnative.dev/blog',
  },
  {
    title: 'Community',
    description: 'Explore & get help',
    url: 'https://reactnative.dev/community/overview',
  },
  {
    title: 'Follow @reactnative',
    description: 'Stay in touch on X',
    url: 'https://x.com/reactnative',
  },
];

export function useTheme() {
  const colorScheme = useColorScheme();

  return {
    colors: COLORS[colorScheme === 'dark' ? 'dark' : 'light'],
  };
}

export function ThemedText({
  color,
  style,
  ...props
}) {
  const {colors} = useTheme();

  return (
    <Text
      style={[
        {
          color:
            color === 'secondary' ? colors.textSecondary : colors.textPrimary,
        },
        style,
      ]}
      {...props}
    />
  );
}

export function NewAppScreen({
  templateFileName = 'App.tsx',
  safeAreaInsets = {top: 0, bottom: 0, left: 0, right: 0},
}) {
  const {colors} = useTheme();
  const isDarkMode = useColorScheme() === 'dark';
  const isLargeScreen = useWindowDimensions().width > 600;

  return (
    <View
      style={{
        backgroundColor: colors.background,
        paddingTop: safeAreaInsets.top,
        paddingLeft: safeAreaInsets.left,
        paddingRight: safeAreaInsets.right,
      }}>
      <ScrollView style={{paddingBottom: safeAreaInsets.bottom}}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Image
              style={styles.logo}
              source={
                isDarkMode
                  ? require('./assets/react-dark.png').default
                  : require('./assets/react-light.png').default
              }
            />
            <ThemedText style={styles.title}>
              Welcome to React Native + Neutralino!
            </ThemedText>
            {getVersionLabel()}
            {getHermesLabel()}
            <ThemedText
              style={[
                styles.callout,
                {backgroundColor: colors.backgroundHighlight},
              ]}>
              💡&ensp;Open{' '}
              <Text style={styles.calloutEmphasis}>{templateFileName}</Text> to
              get started
            </ThemedText>
          </View>
          <View style={styles.linksContainer}>
            <ThemedText style={styles.linksTitle}>Learn & Explore</ThemedText>
            {Links.map(({title, description, url}, i) => (
              <TouchableHighlight
                key={i}
                activeOpacity={0.6}
                underlayColor={colors.background}
                onPress={() => os.open(url)}
                style={[
                  styles.link,
                  // eslint-disable-next-line react-native/no-inline-styles
                  {
                    maxWidth: isLargeScreen ? 240 : 360,
                    borderColor: colors.cardOutline,
                    backgroundColor: colors.cardBackground,
                  },
                ]}>
                <View>
                  <ThemedText style={styles.linkText}>{title}</ThemedText>
                  <ThemedText style={{color: colors.textSecondary}}>
                    {description}
                  </ThemedText>
                </View>
              </TouchableHighlight>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function getVersionLabel() {
  return (
    <ThemedText color="secondary" style={styles.label}>
      Version: {ReactNativeVersion.getVersionString()}
    </ThemedText>
  );
}

function getHermesLabel() {
  if ((globalThis).HermesInternal == null) {
    return null;
  }

  return (
    <ThemedText color="secondary" style={styles.label}>
      JS Engine: Hermes
    </ThemedText>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
  },
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
  linksContainer: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    columnGap: 12,
    rowGap: 12,
    maxWidth: 800,
    marginBottom: 48,
  },
  linksTitle: {
    width: '100%',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
  },
  link: {
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 24,
    borderRadius: 12,
    borderWidth: 1,
    boxShadow: '0 4px 8px rgba(0, 0, 0, .03)',
  },
  linkText: {
    marginBottom: 4,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default NewAppScreen;