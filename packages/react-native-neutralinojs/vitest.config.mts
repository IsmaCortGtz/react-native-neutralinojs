import { fileURLToPath } from 'node:url';
import { defineConfig, defineProject } from 'vitest/config';

const packageRoot = fileURLToPath(new URL('.', import.meta.url));

export const unitProject = defineProject({
  root: packageRoot,
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    name: 'react-native-neutralinojs:unit',
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
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    name: 'react-native-neutralinojs:e2e',
    environment: 'node',
    include: [
      '**/*.e2e.{test,spec}.?(c|m)[jt]s?(x)',
      '**/*.e2e.?(c|m)[jt]s?(x)',
    ],
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
