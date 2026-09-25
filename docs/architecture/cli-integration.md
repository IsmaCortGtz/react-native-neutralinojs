# CLI Integration

React Native uses `@react-native-community/cli` as its extensible command-line harness. `react-native-neutralinojs` hooks directly into this system via its `react-native.config.cjs` manifest.

---

## The Configuration Manifest

Located at the root of `packages/react-native-neutralinojs/react-native.config.cjs`:

```javascript
module.exports = {
  platforms: {
    neu: {
      dependencyConfig: () => ({}),
      projectConfig: () => ({
        sourceDir: 'neutralino',
      }),
    },
  },
  commands: [
    { name: 'init-neu', func: require('./dist/cli/init-neu.js') },
    { name: 'update-neu', func: require('./dist/cli/update-neu.js') },
    { name: 'run-neu', func: require('./dist/cli/run-neu.js') },
    { name: 'build-neu', func: require('./dist/cli/build-neu.js') },
  ],
  healthChecks: [
    {
      label: 'Neutralino',
      healthchecks: require('./dist/cli/doctor.js'),
    },
  ],
};
```

---

## Platform Registration (`platforms.neu`)

By defining `platforms.neu`, React Native CLI recognizes `neu` as a first-class platform alongside `ios`, `android`, `windows`, and `macos`.

- `sourceDir`: Points to `neutralino`, establishing that native desktop configuration files live inside this directory.

---

## Command Lifecycle & Execution

### Dev Server Lifecycle (`run-neu`)

```mermaid
sequenceDiagram
  autonumber
  actor Dev as Developer
  participant CLI as React Native CLI
  participant Vite as Vite Dev Server
  participant Neu as Neutralino Process

  Dev->>CLI: npx react-native run-neu
  CLI->>CLI: Verify neutralino/ exists (or run init)
  CLI->>Vite: Start Vite dev server on port 8082
  CLI->>CLI: Generate instance UUID & find free port
  CLI->>Neu: Spawn npx neu run --url=http://localhost:8082?neutralinoReactNativeUid=UUID
  Neu->>Vite: Request HTML & /__neutralino_globals.js
  Vite-->>Neu: Proxy globals & serve HMR bundle
  Dev->>CLI: Press 'r' in terminal
  CLI->>Vite: Broadcast 'full-reload' via WebSocket
  Vite-->>Neu: Reload window
```

### Stdin Raw Mode Handling

`run.ts` puts `process.stdin` into raw mode to capture single keypresses:

- **`r` key:** Calls `server.ws.send({ type: 'full-reload' })`, triggering a live reload across all connected Neutralino webview instances without restarting the dev server.
- **`o` key:** Calls `openNeu(url)`, allocating a new session UUID and spawning a parallel desktop window.
- **`Ctrl+C`:** Gracefully intercepts exit, cleans up streams, and terminates child processes.

### Production Build Lifecycle (`build-neu`)

When building for production:

1. `build-neu.ts` executes `vite.build()` against `defaultViteConfig()`, compiling the bundle into `neutralino/vite-dist/`.
2. Changes the working directory to `neutralino/`.
3. Runs `npx neu build ${argv}`, copying the static bundle into Neutralino's asset payload and creating standalone cross-platform executables.
