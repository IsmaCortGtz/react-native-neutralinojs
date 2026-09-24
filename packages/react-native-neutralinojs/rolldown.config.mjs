import { defineConfig } from 'rolldown';

export default defineConfig({
  input: {
    'cli/init-neu': 'src/cli/init-neu.ts',
    'cli/update-neu': 'src/cli/update-neu.ts',
    'cli/run-neu': 'src/cli/run-neu.ts',
    'cli/build-neu': 'src/cli/build-neu.ts',
    'cli/doctor': 'src/cli/doctor.ts',
  },
  platform: 'node',
  external: [
    'vite',
    'chalk',
    '@neutralinojs/neu',
    '@vitejs/plugin-react',
    'vite-plugin-commonjs',
    '@bunchtogether/vite-plugin-flow',
  ],
  output: {
    dir: 'dist',
    format: 'cjs',
    exports: 'auto',
    chunkFileNames: 'chunks/[name].js',
    cleanDir: true,
  },
});
