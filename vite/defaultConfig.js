const reactNativeNeu = require('./customPlugin.js');
const { netAuthProxyPlugin, neuAuthPlugin } = require('./neuAuthPlugin.js');

module.exports = async function defaultViteConfig() {
  try {
    const { rnw } = await import('vite-plugin-rnw');

    return {
      root: 'neutralino',
      build: {
        outDir: 'vite-dist',
      },
      logLevel: 'warn',
      server: { port: 8082 },
      plugins: [neuAuthPlugin(), netAuthProxyPlugin(), reactNativeNeu(), rnw()],
      esbuild: { jsx: 'automatic' },
      resolve: {
        alias: {
          'react-native$': 'react-native-web',
        },
      },
    }
  } catch {
    return {};
  }
}