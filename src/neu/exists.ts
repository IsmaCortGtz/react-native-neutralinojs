import fs from 'node:fs';
import path from 'node:path';
const root = process.cwd();

export function neuExists() {
  const configExists = fs.existsSync(path.join(root, 'neutralino', 'neutralino.config.json'));
  const logDirExists = fs.existsSync(path.join(root, 'neutralino', 'log'));
  return configExists && logDirExists;
}

export function binExists() {
  const neuBinPath = path.join(root, 'neutralino', 'bin');
  if (!fs.existsSync(neuBinPath)) return false;

  const files = fs.readdirSync(neuBinPath, { withFileTypes: true });
  return files.some(f => !f.isDirectory() && f.name.startsWith('neutralino'));
}