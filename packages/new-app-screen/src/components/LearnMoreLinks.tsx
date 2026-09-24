import * as React from 'react';
import { os } from '@neutralinojs/lib';
import {
  StyleSheet,
  TouchableHighlight,
  View,
  useWindowDimensions,
} from 'react-native';
import Links from '../Links';
import { ThemedText, useTheme } from '../Theme';

export function LearnMoreLinks(): React.JSX.Element {
  const { colors } = useTheme();
  const isLargeScreen = useWindowDimensions().width > 600;

  return (
    <View style={styles.linksContainer}>
      <ThemedText style={styles.linksTitle}>Learn & Explore</ThemedText>
      {Links.map(({ title, description, url }, i) => (
        <TouchableHighlight
          key={i}
          activeOpacity={0.6}
          underlayColor={colors.background}
          onPress={() => os.open(url)}
          style={[
            styles.link,
            {
              maxWidth: isLargeScreen ? 240 : 360,
              borderColor: colors.cardOutline,
              backgroundColor: colors.cardBackground,
            },
          ]}>
          <View>
            <ThemedText style={styles.linkText}>{title}</ThemedText>
            <ThemedText style={{ color: colors.textSecondary }}>
              {description}
            </ThemedText>
          </View>
        </TouchableHighlight>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
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

export default LearnMoreLinks;
