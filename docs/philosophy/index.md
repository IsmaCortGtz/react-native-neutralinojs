# Project Philosophy & Overview

**React Native Neutralinojs** brings the React Native component paradigm to desktop operating systems (Linux, macOS, and Windows) with a relentless focus on **lightweight performance, resource efficiency, and developer ergonomics**.

---

## What is React Native Neutralinojs?

Historically, targeting desktop with React Native required choosing between two major compromises:

1. **Heavyweight Web Wrappers (e.g., Electron):** Running a web bundle inside Electron brings full Chromium and Node.js runtimes along with it. A trivial application often requires upwards of 150MB to 300MB of RAM and produces installer packages exceeding 100MB.
2. **Platform-Specific Native Runtimes (e.g., `react-native-windows`, `react-native-macos`):** While providing true native UI controls, these runtimes require distinct native toolchains (Visual Studio, Xcode, native C++ SDKs), frequent synchronization issues with upstream React Native versions, and significant maintenance overhead.

**React Native Neutralinojs** offers a pragmatic third way:

It pairs **`react-native-web`** with **[Neutralinojs](https://neutralino.js.org/)**—a lightweight portable desktop runtime that uses the operating system's built-in webview (WebKit on macOS/Linux, WebView2 on Windows) driven by a compact, high-speed C/C++ backend.

---

## Core Philosophical Tenets

### 1. Minimal Resource Footprint

Desktop users should not sacrifice gigabytes of RAM or significant battery life for auxiliary desktop applications. By relying on native webviews already embedded in the operating system:

- Application binaries remain under **15 MB**.
- Idle memory footprint is dramatically smaller than Electron.
- Cold startup times are nearly instantaneous.

### 2. Modern Web Developer Experience (Vite over Metro)

Standard React Native relies on Metro bundler for mobile devices. However, for desktop development on webviews, **[Vite](https://vite.dev/)** offers unparalleled speed:

- Instant server startup via native ES modules.
- Lightning-fast Hot Module Replacement (HMR).
- Seamless interoperability with the broader web and Rollup/Vite plugin ecosystem.
- No need to run `npm run start` or manage Metro ports when working on desktop.

### 3. Native Integration Without Bloat

Neutralinojs provides a rich set of native operating system APIs through its lightweight C/C++ process:

- Direct filesystem read/write access.
- OS-level dialogs, system notifications, and tray icons.
- Window management (frameless, transparency, minimize, fullscreen).
- System execution and process management.

All of this is accessible directly from your React Native JavaScript layer via `@neutralinojs/lib` without requiring native Objective-C/Swift or C# bridge compilation.

### 4. Zero Disruption to Mobile Codebases

Your core application logic, components, and state management remain pure React Native. Through platform extensions (`.neu.tsx`, `.web.tsx`) and the custom runtime shim (`Platform.OS === 'neu'`), you can maintain a unified codebase for iOS, Android, and desktop without polluting mobile build configurations.
