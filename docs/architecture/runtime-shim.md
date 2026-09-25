# Runtime Shim & Platform Identification

To enable code reusability while allowing developers to differentiate between mobile, standard web, and Neutralino desktop runtimes, the package provides a lightweight runtime shim.

---

## The Shim Entrypoint

Located at `packages/react-native-neutralinojs/exports/index.js`:

```javascript
export * from 'react-native-web/dist/index.js';

export const Platform = {
  OS: 'neu',
  select: (obj) => ('neu' in obj ? obj.neu : obj.default),
  get isTesting() {
    return process.env.NODE_ENV === 'test';
  },
  get Version() {
    return '1.0.2';
  },
};

class ReactNativeVersion {
  static major = 1;
  static minor = 0;
  static patch = 2;
  static prerelease = null;
  static getVersionString() {
    return `${this.major}.${this.minor}.${this.patch}${
      this.prerelease != null ? `-${this.prerelease}` : ''
    }`;
  }
}

const version = {
  major: ReactNativeVersion.major,
  minor: ReactNativeVersion.minor,
  patch: ReactNativeVersion.patch,
  prerelease: ReactNativeVersion.prerelease,
};

export { ReactNativeVersion, version };
```

---

## How It Works

### 1. Transparent Import Aliasing

During Vite compilation, `customPlugin.ts` sets up resolve aliases:

```typescript
resolve: {
  alias: [
    { find: /^react-native$/, replacement: shimPath },
    { find: /^react-native-web$/, replacement: shimPath },
  ],
}
```

Whenever application or library code writes `import { View, Text, Platform } from 'react-native'`, Vite resolves the request to the shim.

### 2. `Platform.OS === 'neu'`

The shim sets `Platform.OS = 'neu'`. This enables desktop-specific branch execution:

```typescript
import { Platform } from 'react-native';

if (Platform.OS === 'neu') {
  console.log('Running on Neutralino desktop!');
}
```

### 3. `Platform.select`

The `Platform.select` utility checks for the `'neu'` key first, falling back to `'default'`:

```typescript
import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: Platform.select({
      neu: 32, // Desktop padding
      ios: 16,
      android: 16,
      default: 12,
    }),
  },
});
```

### 4. Direct Re-export of `react-native-web`

All React Native core primitives (`View`, `Text`, `StyleSheet`, `ScrollView`, `TextInput`, `Animated`, etc.) are re-exported directly from `react-native-web/dist/index.js`, guaranteeing 100% web standard rendering fidelity.
