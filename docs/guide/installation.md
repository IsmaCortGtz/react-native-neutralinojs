# Installation

Follow these steps to integrate React Native Neutralinojs into your project.

---

## 1. Install `react-dom` (Strict Exact Match)

::: danger CRITICAL: EXACT VERSION MATCH REQUIRED
The version of `react-dom` **must match the exact version** of `react` installed in your project. A version mismatch between `react` and `react-dom` (even a patch version difference) will cause runtime hook errors or fatal crashes.
:::

Check your current `react` version in `package.json` or your lockfile. Then install `react-dom` with the exact version flag:

::: code-group

```bash [pnpm]
# Example if react is 18.2.0:
pnpm add react-dom@<EXACT_REACT_VERSION> --save-exact
```

```bash [npm]
npm install react-dom@<EXACT_REACT_VERSION> --save-exact
```

```bash [yarn]
yarn add react-dom@<EXACT_REACT_VERSION> --exact
```

:::

---

## 2. Install Core Package

Install `react-native-neutralinojs` in your project:

::: code-group

```bash [pnpm]
pnpm add react-native-neutralinojs
```

```bash [npm]
npm install react-native-neutralinojs
```

```bash [yarn]
yarn add react-native-neutralinojs
```

:::

---

## 3. Install Peer Dependencies

Install the required peer dependencies for Web & Neutralino runtime integration:

- `react-native-web`: Provides the web rendering layer for React Native components.
- `@neutralinojs/lib`: Provides the JavaScript client for accessing Neutralino OS APIs (`Neutralino.os`, `Neutralino.filesystem`, `Neutralino.window`, etc.).

::: code-group

```bash [pnpm]
pnpm add @neutralinojs/lib react-native-web
```

```bash [npm]
npm install @neutralinojs/lib react-native-web
```

```bash [yarn]
yarn add @neutralinojs/lib react-native-web
```

:::

---

## 4. (Optional) Install Desktop Welcome Screen

If your app uses `@react-native/new-app-screen`, install the desktop-optimized drop-in replacement:

::: code-group

```bash [pnpm]
pnpm add @react-native-neutralinojs/new-app-screen
```

```bash [npm]
npm install @react-native-neutralinojs/new-app-screen
```

```bash [yarn]
yarn add @react-native-neutralinojs/new-app-screen
```

:::

_(See the [Desktop UI & Screens Guide](./desktop-ui) for aliasing setup)._

---

## 5. Add Scripts to `package.json`

Add convenient shortcut scripts to your `package.json` alongside your existing mobile targets:

```json
{
  "scripts": {
    "android": "react-native run-android",
    "ios": "react-native run-ios",
    "start": "react-native start",
    "neu": "react-native run-neu",
    "build:neu": "react-native build-neu"
  }
}
```

Now you are ready to launch your application on desktop!

```bash
pnpm neu
```
