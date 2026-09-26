# Desktop UI & Screens

Standard React Native template projects rely on `@react-native/new-app-screen` for the default starter screen. However, this component is designed specifically for mobile devices with portrait aspect ratios and mobile URL linking.

`@react-native-neutralinojs/new-app-screen` provides an optimized, drop-in replacement tailored for desktop windows.

---

## Key Desktop Enhancements

- **Responsive Desktop Layout:** Seamlessly scales and adapts to wide, resizable desktop application windows.
- **Native Link Delegation:** External links are opened using Neutralino's OS bridge (`Neutralino.os.open`) in the default system browser instead of failing mobile URL schemes.
- **Desktop Developer Shortcuts:** Includes desktop-specific instructions for DevTools (<kbd>F12</kbd>) and window reloads (<kbd>Ctrl</kbd>+<kbd>R</kbd> / <kbd>Cmd</kbd>+<kbd>R</kbd>).
- **Dark & Light Mode Integration:** Automatically detects the operating system color scheme using `useColorScheme()`.

---

## Zero-Code Alias Setup

You can keep your existing React Native imports without changing application source code:

```tsx
// Keep this exact import in App.tsx!
import { Header, LearnMoreLinks } from '@react-native/new-app-screen';
```

Simply redirect the import using aliases in Vite and TypeScript:

### 1. Vite Alias (`neutralino/vite.config.ts`)

```typescript
import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: [
      {
        find: /^@react-native\/new-app-screen$/,
        replacement: '@react-native-neutralinojs/new-app-screen',
      },
    ],
  },
});
```

### 2. TypeScript Path (`tsconfig.json`)

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@react-native/new-app-screen": ["./node_modules/@react-native-neutralinojs/new-app-screen"]
    }
  }
}
```

---

## Usage Examples

### Full Screen Component

```tsx
import React from 'react';
import NewAppScreen from '@react-native/new-app-screen';

export default function App() {
  return (
    <NewAppScreen
      templateFileName="App.tsx"
      safeAreaInsets={{ top: 0, bottom: 0, left: 0, right: 0 }}
    />
  );
}
```

### Modular Components

You can import and compose individual components in your custom views:

```tsx
import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import {
  Header,
  LearnMoreLinks,
  ThemedText,
  useTheme,
  DebugInstructions,
  ReloadInstructions,
} from '@react-native/new-app-screen';

export default function CustomHomeScreen() {
  const { colors } = useTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <Header templateFileName="App.tsx" />
      <View style={styles.body}>
        <ThemedText style={styles.title}>Welcome to Neutralino Desktop</ThemedText>
        <ReloadInstructions />
        <DebugInstructions />
        <LearnMoreLinks />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  body: { padding: 24, alignItems: 'center' },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 16 },
});
```

---

## Component API Reference

### `<NewAppScreen />`

| Prop               | Type     | Default                                    | Description                               |
| :----------------- | :------- | :----------------------------------------- | :---------------------------------------- |
| `templateFileName` | `string` | `'App.tsx'`                                | File name displayed in step instructions. |
| `safeAreaInsets`   | `object` | `{ top: 0, bottom: 0, left: 0, right: 0 }` | Custom margin insets for desktop framing. |

### Exported Utilities & Components

- **`Header`**: Displays the React Native logo with desktop version badges.
- **`LearnMoreLinks`**: Responsive grid linking to official documentation.
- **`ReloadInstructions`**: Desktop reload shortcuts (<kbd>Ctrl+R</kbd> / <kbd>Cmd+R</kbd>).
- **`DebugInstructions`**: DevTools inspection instructions (<kbd>F12</kbd>).
- **`ThemedText`**: Text component honoring active theme contrast.
- **`useTheme()`**: Hook returning `{ colors, isDark }` based on system preferences.
- **`Colors`**: Static color palette map for light and dark themes.
