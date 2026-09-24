import * as React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Header from './components/Header';
import LearnMoreLinks from './components/LearnMoreLinks';
import { useTheme } from './Theme';
import type { NewAppScreenProps } from './types';

export function NewAppScreen({
  templateFileName = 'App.tsx',
  safeAreaInsets = { top: 0, bottom: 0, left: 0, right: 0 },
}: NewAppScreenProps): React.JSX.Element {
  const { colors } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        paddingTop: safeAreaInsets.top,
        paddingLeft: safeAreaInsets.left,
        paddingRight: safeAreaInsets.right,
      }}
    >
      <ScrollView style={{ paddingBottom: safeAreaInsets.bottom }}>
        <View style={styles.container}>
          <Header templateFileName={templateFileName} />
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
  },
});

export default NewAppScreen;
