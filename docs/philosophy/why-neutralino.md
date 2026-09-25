# Why Neutralinojs?

When choosing a runtime for running web-powered desktop applications, modern developers frequently evaluate **Electron**, **Tauri**, or platform-native ports like **React Native Windows** and **React Native macOS**.

Here is an architectural comparison and the rationale behind choosing Neutralinojs.

---

## Architectural Comparison

| Dimension               | **React Native Neutralinojs**      | **Electron**       | **Tauri**                          | **RN Windows / macOS**                 |
| :---------------------- | :--------------------------------- | :----------------- | :--------------------------------- | :------------------------------------- |
| **Renderer Engine**     | System WebView (WebKit / WebView2) | Embedded Chromium  | System WebView (WebKit / WebView2) | True Native OS Widgets (XAML / AppKit) |
| **Backend Core**        | Embedded C/C++ Server              | Node.js Runtime    | Rust Binary                        | C++ / Objective-C Bridge               |
| **Installed Toolchain** | Node.js only                       | Node.js only       | Rust toolchain + C++ Build Tools   | Xcode / Visual Studio + C++ Compilers  |
| **Binary Output Size**  | **~5 – 15 MB**                     | **~85 – 150 MB+**  | **~10 – 20 MB**                    | Large (native dependencies)            |
| **Idle Memory (RAM)**   | **~30 – 60 MB**                    | **~120 – 300 MB+** | **~30 – 60 MB**                    | Moderate                               |
| **Bundling Speed**      | Ultra-fast (Vite HMR)              | Metro / Webpack    | Vite / Webpack                     | Metro Native Packager                  |
| **Platform Target**     | `Platform.OS === 'neu'`            | Web / Custom       | Web / Custom                       | `windows` / `macos`                    |

---

## Key Advantages

### 1. No Native Compiler Toolchain Required

Frameworks like Tauri require developers to install and configure the Rust compiler (`cargo`), platform C++ toolchains, and platform build SDKs. Similarly, `react-native-windows` requires Visual Studio with specific C++ workload dependencies, and `react-native-macos` requires macOS and Xcode.

With **React Native Neutralinojs**, your desktop build relies entirely on Node.js and precompiled Neutralinojs binaries. Any web or React Native developer on Linux, macOS, or Windows can run and package desktop applications immediately.

### 2. Elimination of Chromium Overhead

Electron ships a copy of Chromium and Node.js with every single application you package. If a user runs three Electron apps, they are running three distinct instances of Chromium and three separate Node.js processes.

Neutralinojs connects to the webview already maintained, patched, and updated by the host operating system:

- **Windows:** Microsoft Edge WebView2
- **macOS:** Apple WebKit
- **Linux:** WebKitGTK

This saves hundreds of megabytes of disk space and memory while benefiting from OS-level security updates.

### 3. Native C/C++ Performance

Rather than running an entire Node.js server inside the client executable, Neutralinojs implements its system API server in lightweight, high-performance C/C++. System calls (file I/O, window controls, notifications) are handled with minimal latency and near-zero CPU overhead.

### 4. Seamless Dev-to-Production Parity

During development, your app runs via Vite's blazing-fast dev server with HMR. When building for production with `npx react-native build-neu`, Vite produces an optimized static web bundle, and Neutralino packages it together with the lightweight runtime binary into cross-platform executables ready for distribution.
