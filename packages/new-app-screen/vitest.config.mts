import { fileURLToPath } from 'node:url';
import { defineConfig, defineProject } from 'vitest/config';

const packageRoot = fileURLToPath(new URL('.', import.meta.url));

export const unitProject = defineProject({
  root: packageRoot,
  oxc: {
    jsx: {
      runtime: 'automatic',
    },
  },
  test: {
    name: 'new-app-screen:unit',
    environment: 'node',
    include: ['**/*.{test,spec}.?(c|m)[jt]s?(x)'],
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/*.e2e.*',
      '**/*.e2e.{test,spec}.?(c|m)[jt]s?(x)',
    ],
    testTimeout: 5000,
  },
});

export const e2eProject = defineProject({
  root: packageRoot,
  oxc: {
    jsx: {
      runtime: 'automatic',
    },
  },
  test: {
    name: 'new-app-screen:e2e',
    environment: 'node',
    include: ['**/*.e2e.{test,spec}.?(c|m)[jt]s?(x)', '**/*.e2e.?(c|m)[jt]s?(x)'],
    exclude: ['**/node_modules/**', '**/dist/**'],
    testTimeout: 30000,
    hookTimeout: 30000,
  },
});

export const projects = [unitProject, e2eProject];

export default defineConfig({
  test: {
    projects,
    passWithNoTests: true,
  },
});
