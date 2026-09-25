# React Native Neutralinojs

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![pnpm](https://img.shields.io/badge/pnpm-12.6.0-F69220.svg)](https://pnpm.io/)
[![React Native](https://img.shields.io/badge/React%20Native-0.70+-61DAFB.svg)](https://reactnative.dev/)
[![Neutralinojs](https://img.shields.io/badge/Neutralinojs-v11+-ff8c00.svg)](https://neutralino.js.org/)
[![Documentation](https://img.shields.io/badge/docs-website-brightgreen.svg)](https://ismacortgtz.is-a.dev/react-native-neutralinojs/)

An ecosystem bringing **React Native** applications to the lightweight, cross-platform **[Neutralinojs](https://neutralino.js.org/)** desktop runtime.

> 📚 **Official Documentation**: [https://ismacortgtz.is-a.dev/react-native-neutralinojs/](https://ismacortgtz.is-a.dev/react-native-neutralinojs/)

---

## 📖 Overview

**React Native Neutralinojs** allows developers to target desktop operating systems (Linux, macOS, and Windows) with React Native codebases while maintaining an ultra-lightweight footprint.

Unlike heavier solutions like Electron or platform-specific native runtimes like `react-native-windows` and `react-native-macos`, Neutralinojs leverages the operating system's built-in webview and provides an efficient native C/C++ backend. By pairing `react-native-web` with [Vite](https://vite.dev/) and custom CLI extensions, this project delivers:

- **Ultra-fast development cycles:** Instant bundling and HMR powered by Vite.
- **Minimal bundle sizes:** Lightweight production binaries with low memory and CPU overhead.
- **Deep React Native CLI integration:** Native CLI commands integrated into `@react-native-community/cli`.
- **Cross-platform desktop support:** Builds for Linux, macOS, and Windows out of the box.

---

## 🏗️ Monorepo Architecture & Roadmap

This project is organized as a **monorepo** managed with **pnpm workspaces**, transitioning from a single package to an ecosystem of packages:

- **Core Platform**: Provides the base platform target, CLI integration, and Vite bundling infrastructure to run and package React Native apps on Neutralinojs.
- **Native Dependency Adapters (In Progress / Future)**: Standard React Native applications often depend on common native modules (e.g. AsyncStorage, Filesystem, NetInfo, DeviceInfo). This monorepo will host compatible packages, polyfills, and bridge adapters tailored for Neutralinojs native APIs and Web Standards.

---

## 📦 Packages

| Package                                                                                                                | Version                                                                                                                                                           | Alias                                                                                        | Docs                                                                                                                               |
| :--------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------- |
| [`react-native-neutralinojs`](https://www.npmjs.com/package/react-native-neutralinojs)                                 | [![npm version](https://img.shields.io/npm/v/react-native-neutralinojs)](https://www.npmjs.com/package/react-native-neutralinojs)                                 | N/A                                                                                          | [Docs](https://ismacortgtz.is-a.dev/react-native-neutralinojs/) / [README](packages/react-native-neutralinojs/README.md)           |
| [`@react-native-neutralinojs/new-app-screen`](https://www.npmjs.com/package/@react-native-neutralinojs/new-app-screen) | [![npm version](https://img.shields.io/npm/v/@react-native-neutralinojs/new-app-screen)](https://www.npmjs.com/package/@react-native-neutralinojs/new-app-screen) | [`@react-native/new-app-screen`](https://www.npmjs.com/package/@react-native/new-app-screen) | [Docs](https://ismacortgtz.is-a.dev/react-native-neutralinojs/guide/desktop-ui.html) / [README](packages/new-app-screen/README.md) |

### Upcoming / In-Development Packages

The following packages are planned or under active development:

- **Native Dependency Adapters**: Community-standard React Native modules (AsyncStorage, NetInfo, Filesystem, etc.) adapted for Neutralinojs native APIs.

---

## ️ Monorepo Development

If you want to contribute to the packages in this monorepo:

### Prerequisites

- **Node.js**: `>= 22`
- **pnpm**: `>= 9` (Recommended `12.x`)

### Workspace Commands

```bash
# Clone the repository
git clone git@github.com:IsmaCortGtz/react-native-neutralinojs.git
cd react-native-neutralinojs

# Install all workspace dependencies
pnpm install

# Build all packages across workspaces
pnpm build

# Run all tests across workspaces
pnpm test

# Run unit tests only (<= 5s timeout)
pnpm run test:unit

# Run E2E tests only (<= 5m timeout)
pnpm run test:e2e

# Run linter across workspaces
pnpm lint
```

---

## 📄 License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
