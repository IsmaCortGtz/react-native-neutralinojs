---
layout: home

hero:
  name: 'React Native Neutralinojs'
  text: 'Lightweight Cross-Platform Desktop Apps'
  tagline: 'Run React Native on desktop using Neutralinojs with zero-bloat webviews, lightning-fast Vite HMR, and native C++ performance.'
  image:
    src: /logo.svg
    alt: React Native Neutralinojs Logo
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: Architecture
      link: /architecture/overview
    - theme: alt
      text: Project Philosophy
      link: /philosophy/

features:
  - icon: 🪶
    title: Minimal Footprint
    details: Leverages the operating system's built-in webview and lightweight C++ backend instead of bundling heavy Chromium and Node.js runtimes.
  - icon: ⚡
    title: Instant Vite Bundling
    details: Replaces Metro for desktop workflows with Vite. Experience instant server startups and sub-second Hot Module Replacement (HMR).
  - icon: 💻
    title: Cross-Platform Desktop
    details: Build single, self-contained desktop binaries for Linux, macOS, and Windows out of the box with zero native compilation toolchains.
  - icon: 🔌
    title: React Native CLI Integration
    details: Directly registers commands (`run-neu`, `build-neu`, `init-neu`, `doctor`) into standard `@react-native-community/cli`.
  - icon: 🎯
    title: Seamless Web & Neu Shim
    details: Automatic platform shimming identifying as `Platform.OS = 'neu'`, with complete support for `.neu.*` and `.web.*` extensions.
  - icon: 🖥️
    title: Desktop-Ready UI Components
    details: Dedicated `@react-native-neutralinojs/new-app-screen` replacement featuring responsive windowing and OS-level link handling.
---

<div class="tip custom-block" style="margin-top: 2rem;">
  <p class="custom-block-title">QUICK START</p>
  <p>Run your React Native app on Neutralinojs desktop with a single command:</p>
</div>

```bash
npx react-native run-neu
```
