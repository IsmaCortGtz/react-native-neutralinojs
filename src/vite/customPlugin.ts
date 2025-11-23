import path from 'node:path';
import react from '@vitejs/plugin-react';
import commonjs from 'vite-plugin-commonjs';
import { esbuildFlowPlugin, flowPlugin } from '@bunchtogether/vite-plugin-flow';


const development = process.env.NODE_ENV === 'development';
const extensions = [
  '.neu.mjs', '.neu.js', '.neu.mts', '.neu.ts', '.neu.jsx', '.neu.tsx',
  '.web.mjs', '.web.js', '.web.mts', '.web.ts', '.web.jsx', '.web.tsx',
  '.mjs',     '.js',     '.mts',     '.ts',     '.jsx', 		'.tsx',
  '.json',
];

export default function reactNativeNeu() {
  const shimPath = path.dirname(require.resolve('@neutralinojs/react-native'));
  const newScreenPath = path.join(path.dirname(require.resolve('@neutralinojs/react-native')), 'new-app-screen');
  
  const rnwPlugin = {
    enforce: 'pre',
    name: 'react-native-neu',

    config: () => ({
      define: {
        global: 'self',
        __DEV__: JSON.stringify(development),
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'process.env.EXPO_OS': JSON.stringify('neu'),
      },
      build: {
        commonjsOptions: {
          transformMixedEsModules: true,
        },
      },
      resolve: {
        extensions,
        alias: [
          { find: /^@react-native\/new-app-screen$/, replacement: newScreenPath },
          { find: /^react-native$/, replacement: shimPath },
          { find: /^react-native-web$/, replacement: shimPath },
        ],
      },
      optimizeDeps: {
        esbuildOptions: {
          plugins: [
            esbuildFlowPlugin(
              new RegExp(/\.(flow|jsx?)$/),
              (_path: string) => "jsx",
            ),
          ],
          resolveExtensions: extensions,
          loader: {
            ".js": "jsx",
          },
        },
      },
    }),
  };

  return [
    flowPlugin({
      exclude: /\/node_modules\/(?!react-native|@react-native|expo|@expo)/,
    }),
    commonjs(),
    rnwPlugin,
    react({
      jsxRuntime: 'automatic',
      exclude: /\/node_modules\/(?!react-native|@react-native|expo|@expo)/,
    }),
  ];
};