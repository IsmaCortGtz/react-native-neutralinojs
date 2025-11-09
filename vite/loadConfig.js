const fs = require('fs');
const path = require('path');
const root = process.cwd();

const viteConfigNames = [
  'vite.config.ts',
  'vite.config.js',
  'vite.config.mjs',
  'vite.config.cjs',
  'vite.config.jsx',
  'vite.config.tsx',
];

module.exports = async function loadViteConfig(dir = '.') {
  try {
    const configPath = viteConfigNames.find(f => fs.existsSync(path.join(root, dir, f)));
    if (!configPath) return {};
  
    const vite = await import('vite');
    const result = await vite.loadConfigFromFile(
      { command: 'serve', mode: 'development' },
      path.join(root, dir, configPath)
    );

    return result?.config || {};
  } catch (error) {
    return {};
  }
}