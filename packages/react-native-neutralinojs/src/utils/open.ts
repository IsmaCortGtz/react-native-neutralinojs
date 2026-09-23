import { platform } from 'node:os';
import { exec } from 'node:child_process';
import { warn } from '@/utils/log';

export default function open(url: string): void {
  const os = platform();
  let command = '';
  
  switch (os) {
    case 'win32':
      command = `start ${url}`;
      break;
    case 'darwin':
      command = `open ${url}`;
      break;
    case 'linux':
      command = `xdg-open ${url}`;
      break;
    default:
      warn(`Unsupported platform: ${os}`);
      return;
  }

  exec(command);
}