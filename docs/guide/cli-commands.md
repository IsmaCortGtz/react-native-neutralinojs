# CLI Commands

`react-native-neutralinojs` integrates directly into the standard `@react-native-community/cli`. All commands can be executed via `npx react-native <command>`.

---

## `run-neu`

Starts the Vite development server and launches the Neutralinojs desktop application window.

```bash
npx react-native run-neu
```

### What Happens Behind the Scenes:

1. Verifies if the `neutralino/` folder exists. If not, automatically runs `init-neu` first.
2. Merges default Vite configuration with your custom `neutralino/vite.config.ts` (if present).
3. Starts the Vite development server (default port `8082`).
4. Generates a unique instance UUID, selects an available local port for Neutralino backend communication, and launches the desktop window.
5. Injects authentication proxies so Neutralino client globals work reliably with Vite HMR.

### Interactive Terminal Hotkeys:

While `run-neu` is running in your terminal, you can press:

- <kbd>r</kbd> — Trigger a full reload across all connected desktop windows.
- <kbd>o</kbd> — Open an additional application window with its own isolated session token.
- <kbd>Ctrl</kbd> + <kbd>C</kbd> — Gracefully stop the server and close the application.

---

## `build-neu`

Compiles your React Native application into static assets and packages it into production-ready Neutralinojs desktop binaries.

```bash
npx react-native build-neu
```

### Build Pipeline:

1. Bundles your React Native application using Vite into `neutralino/vite-dist/` using production optimizations and tree-shaking.
2. Invokes `neu build` inside the `neutralino/` directory.
3. Generates standalone binary executables for all supported desktop platforms inside `neutralino/dist/`:
   - `*-linux_x64`
   - `*-linux_arm64`
   - `*-mac_x64`
   - `*-mac_arm64`
   - `*-win_x64.exe`

### Passing CLI Flags:

Any arguments passed to `build-neu` are forwarded directly to the underlying `neu build` CLI command:

```bash
# Example: pass release flag to neu-cli
npx react-native build-neu --release
```

::: tip Official Neutralinojs CLI Documentation
For all flags supported by `neu build` (such as `--release`, `--clean`, or `--copy-storage`), refer to the [Official Neutralinojs CLI Documentation](https://neutralino.js.org/docs/cli/neu-cli/#neu-build).
:::

---

## `init-neu`

Scaffolds the initial `neutralino/` workspace directory from the template repository.

```bash
npx react-native init-neu
```

### Notes:

- Internally executes: `npx neu create neutralino --template=IsmaCortGtz/react-native-neutralinojs`.
- Creates the minimal configuration (`neutralino.config.json` and entry HTML) required for Vite and Neutralino to interface.
- You typically do **not** need to run this manually, as `run-neu` automatically initializes the project if missing.
- Neutralino CLI downloads templates from GitHub's `main` branch. For more template details, refer to the [Neutralinojs CLI `neu create` guide](https://neutralino.js.org/docs/cli/neu-cli/#neu-create).

---

## `update-neu`

Updates the local Neutralino runtime binaries and client library to the versions specified in your `neutralino.config.json`.

```bash
npx react-native update-neu
```

### Notes:

- Internally runs `neu update` inside `neutralino/`.
- Logs any output or issues to `neutralino/log/cli.log` and `neutralino/log/cli.err.log`.

---

## React Native Doctor Healthchecks

The package registers custom healthchecks into the React Native CLI doctor tool:

```bash
npx react-native doctor
```

Under the **Neutralino** group, doctor verifies:

1. **Neutralino is initialized:** Checks if `neutralino/neutralino.config.json` exists. Can auto-fix via `init-neu`.
2. **Neutralino binaries are installed:** Checks if the platform binaries exist in `neutralino/bin/`. Can auto-fix via `update-neu`.
