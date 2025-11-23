import path from 'node:path';
import fs from 'node:fs';
import { execSync } from 'node:child_process';
import init from '@/neu/init';
import { log } from '@/utils/log';
import { neuExists } from '@/neu/exists';
const root = process.cwd();

export default async function updateNeuProject() {
  if (!neuExists()) await init();
  log('Updating Neutralino project...\n\n');
  
  try {
    const neuPath = path.join(root, 'neutralino');
    const out = fs.openSync(path.join(root, 'neutralino', 'log', 'cli.log'), 'a');
    const err = fs.openSync(path.join(root, 'neutralino', 'log', 'cli.err.log'), 'a');

    process.chdir(neuPath);
    execSync('npx neu update', { stdio: ['ignore', out, err] });

    log('Neutralino project updated successfully!');
  } catch (_e: any) {
    log('Error updating Neutralino project. Please check the cli log files in the neutralino directory for more details.');
  } finally {
    process.chdir(root);
  }
}