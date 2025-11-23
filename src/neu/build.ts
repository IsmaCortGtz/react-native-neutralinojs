import loadViteConfig from '@/vite/loadConfig';
import defaultViteConfig from '@/vite/defaultConfig';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { neuExists, binExists } from '@/neu/exists';
import { log, error } from '@/utils/log';
const root = process.cwd();

export default async function buildNeu() {
  try {
    if (!neuExists() || !binExists()) {
      error('Neutralino project or neu binary not found. Please initialize the project first.');
      process.exit(1);
    }

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

  } catch (e: any) {
    log('Error building Neutralino project:', e?.stderr?.toString() || e?.message || e);
    process.exit(1);
  } finally {
    process.chdir(root);
  }
}