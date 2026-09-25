# NewAppScreen Architecture

`@react-native-neutralinojs/new-app-screen` adapts the traditional React Native welcome screen specifically for desktop application windows.

---

## Architectural Objectives

1. **Native Desktop Link Handling:** In a desktop webview, invoking `Linking.openURL(url)` often fails or attempts to load the page inside the current application window. This package uses Neutralino's OS bridge (`Neutralino.os.open`) to launch the user's default desktop web browser.
2. **Responsive Desktop Grid:** Desktop windows are typically landscape-oriented and resizable. The component uses flex wrapping and responsive layout mechanics to adjust columns automatically as the window resizes.
3. **Desktop Developer Ergonomics:** Mobile reload instructions (`shake device`) and debug menus do not apply to desktop. The package replaces them with desktop keyboard shortcut instructions (<kbd>Ctrl+R</kbd> / <kbd>Cmd+R</kbd> and <kbd>F12</kbd> DevTools).

---

## Implementation Details

### Native Browser Delegation

When clicking documentation links in `LearnMoreLinks`:

```typescript
import { os } from '@neutralinojs/lib';

export async function openExternalUrl(url: string) {
  try {
    // Attempt native OS launch via Neutralino bridge
    await os.open(url);
  } catch {
    // Fallback for standard browser preview
    window.open(url, '_blank');
  }
}
```

This ensures external documentation opens cleanly in Chrome, Firefox, Safari, or Edge without disrupting the running desktop application.

---

### Theme System Architecture

The package provides a built-in light/dark theme system:

- Integrates with React Native's `useColorScheme()` hook.
- Exports a unified `useTheme()` hook returning `{ isDark, colors }`.
- Defines high-contrast accessible palettes for dark and light modes.
- Components (`ThemedText`, `Header`, `LearnMoreLinks`) automatically synchronize with the host OS theme changes in real time.
