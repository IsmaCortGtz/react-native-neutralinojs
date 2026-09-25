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
