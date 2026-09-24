import * as React from 'react';
import { StyleSheet, Text } from 'react-native';
import { ThemedText } from '../Theme';

export function DebugInstructions(): React.JSX.Element {
  return (
    <ThemedText style={styles.instruction}>
      Press <Text style={styles.highlight}>F12</Text> to open the Neutralinojs developer tools.
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

export default DebugInstructions;
