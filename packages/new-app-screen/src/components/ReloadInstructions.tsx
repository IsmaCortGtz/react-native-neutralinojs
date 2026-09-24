import * as React from 'react';
import { StyleSheet, Text } from 'react-native';
import { ThemedText } from '../Theme';

export function ReloadInstructions(): React.JSX.Element {
  return (
    <ThemedText style={styles.instruction}>
      Press <Text style={styles.highlight}>Ctrl+R</Text> (or{' '}
      <Text style={styles.highlight}>Cmd+R</Text> on macOS) to reload your code.
    </ThemedText>
  );
}

const styles = StyleSheet.create({
  instruction: {
    fontSize: 14,
    marginVertical: 4,
  },
  highlight: {
    fontWeight: '700',
  },
});

export default ReloadInstructions;
