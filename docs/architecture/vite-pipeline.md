# Vite Bundling Pipeline

The Vite bundling pipeline replaces Metro for desktop builds, offering native ES module serving during development and optimized tree-shaken static bundles for production.

---

## The Custom Plugin (`reactNativeNeu`)

Defined in `packages/react-native-neutralinojs/src/vite/customPlugin.ts`, this plugin configures Vite to understand React Native syntax and platform conventions.

### 1. Platform Extension Resolution

The resolver searches for files using the following priority order:

1. **Neutralino-specific extensions (`.neu.*`):**
   - `.neu.tsx`, `.neu.ts`, `.neu.jsx`, `.neu.js`, `.neu.mts`, `.neu.mjs`
2. **Web-standard extensions (`.web.*`):**
   - `.web.tsx`, `.web.ts`, `.web.jsx`, `.web.js`, `.web.mts`, `.web.mjs`
3. **Generic extensions:**
   - `.tsx`, `.ts`, `.jsx`, `.js`, `.mts`, `.mjs`, `.json`

This enables writing desktop-specific overrides (e.g. `Component.neu.tsx`) that take precedence over standard mobile or web implementations.

---

### 2. Environment Injections & Defines

The plugin injects compile-time global variables:

```typescript
define: {
  global: 'self',
  __DEV__: JSON.stringify(development),
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  'process.env.EXPO_OS': JSON.stringify('neu'),
}
```

- **`global: 'self'`**: Ensures libraries expecting Node's `global` or browser `window` execute correctly inside webviews.
- **`__DEV__`**: React Native's standard flag for developer warnings and diagnostics.
- **`process.env.EXPO_OS = 'neu'`**: Enables interoperability with Expo modules checking `EXPO_OS`.

---

### 3. Flow Stripping & CommonJS Compatibility

Many packages in the React Native ecosystem (including core components) distribute source code containing Facebook Flow type syntax.

The pipeline integrates:

- **`@bunchtogether/vite-plugin-flow`**: Automatically strips Flow annotations from `node_modules/(react-native|@react-native|expo)`.
- **`vite-plugin-commonjs`**: Resolves mixed CommonJS/ESM modules seamlessly.
- **`@vitejs/plugin-react`**: Provides React JSX transform and Fast Refresh capabilities.

---

## Configuration Loading & Merging

When `runNeu` or `buildNeu` runs:

1. `loadViteConfig('neutralino')` checks for `vite.config.{ts,mts,js,mjs,cjs}` inside `neutralino/`.
2. `defaultViteConfig()` provides the base configuration (plugins, root directory, server port).
3. Both configurations are merged using `vite.mergeConfig()`. User configurations take precedence while retaining base plugins and alias shims.
