const reactNativeNeu = require('./customPlugin.js');
const { netAuthProxyPlugin, neuAuthPlugin } = require('./neuAuthPlugin.js');

module.exports = async function defaultViteConfig() {
  try {
    return {
      root: 'neutralino',
      build: {
        outDir: 'vite-dist',
      },
      logLevel: 'warn',
      server: { port: 8082 },
      plugins: [neuAuthPlugin(), netAuthProxyPlugin(), reactNativeNeu()],
    }
  } catch {
    return {};
  }
}