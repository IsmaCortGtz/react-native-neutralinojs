import fs from 'node:fs';
import path from 'node:path';
const root = process.cwd();

const viteConfigNames = [
  'vite.config.mts',
  'vite.config.mjs',
  'vite.config.ts',
  'vite.config.js',
  'vite.config.cjs',
  'vite.config.cts',
  'vite.config.jsx',
  'vite.config.tsx',
];

export default async function loadViteConfig(dir: string = '.') {
  try {
    const configPath = viteConfigNames.find(f => fs.existsSync(path.join(root, dir, f)));
    if (!configPath) return {};

    process.env.VITE_CONFIG_NATIVE_IGNORE_WARNING ??= 'true';
  
    const vite = await import('vite');
    const result = await vite.loadConfigFromFile(
      { command: 'serve', mode: 'development' },
      path.join(root, dir, configPath)
    );

    return result?.config || {};
  } catch {
    return {};
  }
}