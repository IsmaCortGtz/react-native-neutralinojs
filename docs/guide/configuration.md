# Configuration

React Native Neutralinojs provides full flexibility to customize both the **Vite bundler** and the **Neutralinojs native runtime**.

---

## 1. Customizing Vite

To customize Vite's behavior (plugins, module aliases, build targets, server proxy rules), create a `vite.config.ts` or `vite.config.js` file inside the `neutralino/` directory.

::: warning IMPORTANT FILE LOCATION
The Vite configuration file **must** reside inside the `neutralino/` folder (e.g. `neutralino/vite.config.ts`), as this is where the CLI looks when merging your custom configuration with default settings.
:::

### Example: `neutralino/vite.config.ts`

```typescript
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 8082, // Override dev server port if needed
  },
  resolve: {
    alias: [
      // Example: redirect native new-app-screen to desktop replacement
      {
        find: /^@react-native\/new-app-screen$/,
        replacement: '@react-native-neutralinojs/new-app-screen',
      },
    ],
  },
});
```

The CLI uses Vite's `mergeConfig` utility to intelligently combine your custom settings with the internal presets (such as Flow stripping, `.neu.*` extension resolution, and authentication plugins).

For all available options, refer to the [Vite Configuration Guide](https://vite.dev/config/).

---

## 2. Customizing Neutralino (`neutralino.config.json`)

The behavior of the desktop application window, permissions, and platform capabilities is configured in `neutralino/neutralino.config.json`.

### Common Window Configurations

```json
{
  "applicationId": "com.myapp.desktop",
  "version": "1.0.0",
  "defaultMode": "window",
  "modes": {
    "window": {
      "title": "My React Native App",
      "width": 1024,
      "height": 720,
      "minWidth": 600,
      "minHeight": 450,
      "center": true,
      "resizable": true,
      "fullScreen": false,
      "enableInspector": true,
      "icon": "/resources/icons/appIcon.png"
    }
  },
  "cli": {
    "binaryVersion": "4.15.0",
    "clientVersion": "3.13.0"
  }
}
```

### Security & Native API Permissions

Neutralinojs implements a security permission model. You can control which native APIs your frontend JavaScript code is allowed to call using `nativeAllowList`:

```json
{
  "nativeAllowList": ["app.*", "os.*", "window.*", "filesystem.*", "storage.*"]
}
```

::: tip Official Neutralinojs Documentation
For the full schema, permissions, and multi-window settings, visit the [Neutralinojs Configuration Specification](https://neutralino.js.org/docs/configuration/neutralino.config.json/).
:::
