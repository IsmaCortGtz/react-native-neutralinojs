# AGENTS.md — Development Guidelines & Invariants

This document establishes the architecture, standards, and operational rules for AI agents and developers working in this repository.

---

## 1. Absolute Invariants

1. **Strict English**: ALL code, inline comments, documentation, commit messages, changesets, and pull requests MUST be written in English—regardless of the language used in prompts or conversational messages.
2. **User-Facing Documentation Required**: Any change affecting user experience, CLI commands/options, public APIs, configuration parameters, or UI components MUST be documented in `docs/guide/` or relevant package READMEs.
3. **Architecture Documentation Required**: Any architectural modification, pipeline change, or new system capability MUST be documented with explanations and diagrams in `docs/architecture/`.
4. **Mandatory Testing**:
   - Every workspace package MUST maintain unit tests (`tests/unit/` or `*.test.ts(x)`).
   - E2E tests (`tests/e2e/` or `*.e2e.test.ts(x)`) are mandatory for packages involving CLI commands, process lifecycle, or integration workflows.
   - Vitest multi-project architecture must be preserved: each package exports `projects = [unitProject, e2eProject]`, registered in the root `vitest.config.mts`.
   - Timeouts: Unit tests <= `5000ms`, E2E tests <= `300000ms` (5 minutes).
5. **Changeset Protocol**:
   - Generate a changeset (`pnpm changeset`) ONLY when publishing user-facing modifications (bug fixes, new features, breaking changes, public exports).
   - NEVER generate a changeset for internal tests, documentation updates, dev tooling, or non-functional refactors.
   - Follow SemVer strictly: `patch` (backward-compatible fixes), `minor` (new backward-compatible features), `major` (breaking changes).
6. **Release-Ready Main Branch**:
   - The primary branch (`main` / `master`) MUST always remain in a state that is ready for immediate deployment and npm publication.
   - Prior to merging or completing work, ensure all verification checks pass: `pnpm run lint`, `pnpm run format:check`, `pnpm test`, `pnpm run build`, and `pnpm docs:build`.

---

## 2. Monorepo Architecture & Workspace

Managed via **pnpm workspaces** (Node `>=22`).

| Directory                            | Scope & Purpose                                                                                                             |
| :----------------------------------- | :-------------------------------------------------------------------------------------------------------------------------- |
| `packages/react-native-neutralinojs` | Core CLI plugin (`react-native-neutralinojs`), Vite runtime shim, authentication proxy, and Neutralino engine orchestrator. |
| `packages/new-app-screen`            | Standalone UI library (`@react-native-neutralinojs/new-app-screen`) providing desktop-adapted template screens.             |
| `docs/`                              | VitePress documentation site deployed to GitHub Pages (`/docs/guide`, `/docs/architecture`, `/docs/philosophy`).            |
| `.changeset/`                        | Changeset metadata directory tracking package version bumps and changelog notes.                                            |

---

## 3. Toolchain & Essential Commands

Always use **`pnpm`** (never `npm` or `yarn`).

| Category      | Command                                                    | Description                                       |
| :------------ | :--------------------------------------------------------- | :------------------------------------------------ |
| **Build**     | `pnpm run build`                                           | Builds all packages via `tsc` and `rolldown`.     |
| **Lint**      | `pnpm run lint`<br>`pnpm run lint:fix`                     | Runs Rust-based `oxlint` across workspace.        |
| **Format**    | `pnpm run format:check`<br>`pnpm run format`               | Runs `oxfmt` across the repository.               |
| **Test**      | `pnpm test`<br>`pnpm run test:unit`<br>`pnpm run test:e2e` | Runs Vitest suites across packages.               |
| **Docs**      | `pnpm docs:dev`<br>`pnpm docs:build`                       | VitePress local development and production build. |
| **Changeset** | `pnpm changeset`<br>`pnpm changeset status`                | Adds or reviews package version bumps.            |

---

## 4. Code & Testing Conventions

- **Tooling**: Uses `oxlint` (linter), `oxfmt` (formatter), and `rolldown` (bundler) instead of ESLint/Prettier/Rollup.
- **TypeScript**: Strict type annotations; avoid `any`. Place shared types in `src/types/`.
- **Path Aliases**: Use `@/` for internal package `src/` references where configured.
- **Logging**: In core packages/CLI, use the project logger (`src/utils/log.ts`) instead of direct `console.log`.
- **Test Isolation**:
  - Unit tests must mock external processes and filesystem writes (`*.test.ts(x)`).
  - E2E tests (`*.e2e.test.ts(x)`) are isolated from unit runs and have extended timeouts (<= 5 minutes).
- **Git Commits**: Follow Conventional Commits: `<type>(<scope>): <description>` (e.g. `feat(cli): add port fallback`, `fix(vite): resolve shim extension`).

---

## 5. Multi-Package Documentation & Versioning Protocol

All package documentation must strictly adhere to the major-versioned directory convention:

1. **Major Version Isolation**:
   - Only **major versions** (`v<Major>`) are segregated into directories. Minor and patch updates edit within the existing major version directory.
   - Shared guides remain at the root of `docs/guide/` (e.g. `getting-started.md`, `installation.md`).
   - Package-specific docs are placed under `docs/guide/<package-id>/v<N>/` (e.g. `docs/guide/react-native-neutralinojs/v2/`, `docs/guide/new-app-screen/v1/`).
2. **Central Configuration (`docs/.vitepress/packages.ts`)**:
   - Register packages and their active/historical major versions in `packagesConfig`.
   - Update `versions`, `defaultVersion`, and `sidebarItems` when releasing a new major version.
   - Dynamic sidebar generator `getGuideSidebar(pkgId?, version?)` generates navigation items.
3. **UI Rules for Headers & Version Selector**:
   - **Navbar Component**: The version selector (`PackageVersionSelector`) is mounted in `themeConfig.nav` in `docs/.vitepress/config.mts` between navigation links and the theme appearance toggle.
   - **Header Trigger Button**: Displays only the version tag and status badge (e.g., `[ 📦 v2 latest ▾ ]`). NEVER display the full package name inside the trigger button.
   - **Sidebar Group Titles**: Sidebar section headers generated by `getGuideSidebar` MUST show only the package name (e.g., `react-native-neutralinojs`), NEVER appending the version in parentheses.
4. **Step-by-Step for New Major Versions**:
   - Create `docs/guide/<pkg>/v<N>/`.
   - Register `v<N>` in `docs/.vitepress/packages.ts`.
   - Add route prefix `'/guide/<pkg>/v<N>/': getGuideSidebar('<pkg>', 'v<N>')` in `docs/.vitepress/config.mts`.
   - For full architecture and Mermaid diagrams, see `docs/architecture/documentation-system.md`.
