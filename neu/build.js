const path = require('path');
const { execSync } = require('child_process');
const { log } = require('../utils/log');
const loadViteConfig = require('../vite/loadConfig.js');
const defaultViteConfig = require('../vite/defaultConfig.js');
const root = process.cwd();

module.exports = async function buildNeu() {
  try {
    log('Building Neutralino project...');

    const vite = await import('vite');
    const userConfig = await loadViteConfig('neutralino');
    const config = vite.mergeConfig(await defaultViteConfig(), userConfig);
  
    await vite.build(config);
    log('Neutralino react-native built successfully. Building neutralino app...');
    
    const neuProjectPath = path.join(root, 'neutralino');
    const argv = process.argv.slice(4).join(' ');

    process.chdir(neuProjectPath);
    execSync(`neu build ${argv}`, { stdio: 'pipe' });

    log('Neutralino app built successfully!');

  } catch (e) {
    log('Error building Neutralino project:', e?.stderr?.toString() || e.message);
    process.exit(1);
  } finally {
    process.chdir(root);
  }
}