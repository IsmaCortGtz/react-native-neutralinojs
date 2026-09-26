# react-native-neutralinojs

`react-native-neutralinojs` is the core package providing React Native CLI commands, Vite runtime shimming, authentication handling, and native Neutralinojs desktop window orchestration.

---

## What's in v2

The v2 architecture delivers significant performance and stability enhancements for running React Native on desktop:

- **Integrated CLI Commands**: Seamlessly extends `@react-native-community/cli` with `run-neu`, `build-neu`, `init-neu`, and `doctor`.
- **Zero-Metro Vite Bundler**: Uses Vite with sub-second Hot Module Replacement (HMR) for instant desktop developer feedback.
- **Bi-Directional Auth Proxy**: Automatic HMAC token and port negotiation between Vite dev server and the Neutralino backend engine.
- **Platform Shimming**: Automatically injects `Platform.OS = 'neu'` and resolves `.neu.*` and `.web.*` extensions natively.
- **Multi-Platform Binary Packaging**: One-command release builds creating standalone executables for Linux, macOS, and Windows.

---

## Core Topics

Explore the core package guides:

- [CLI Commands](./cli-commands): Comprehensive reference for `run-neu`, `build-neu`, and CLI options.
- [Configuration](./configuration): Learn how to configure `neutralino.config.json` and Vite bundler settings.
- [Troubleshooting](./troubleshooting): Resolve common port conflicts, webview dependencies, and auth errors.
