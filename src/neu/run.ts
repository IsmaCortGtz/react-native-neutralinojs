import chalk from 'chalk';
import openNeu from '@/neu/open';
import loadViteConfig from '@/vite/loadConfig';
import defaultViteConfig from '@/vite/defaultConfig';
import { log, warn, raw } from '@/utils/log';
import { NeutralinoDevServer } from '@/types/Vite';

export default async function runNeu() {
  const vite = await import('vite');
  const userConfig = await loadViteConfig('neutralino');
  const config = vite.mergeConfig(await defaultViteConfig(), userConfig);
  const port = config.server.port || 8082;
  const url = `http://localhost:${port}`;

  raw('');
  raw(chalk.green(`Starting Neu development server on ${url}\n`));

  const server = await vite.createServer(config) as NeutralinoDevServer;
  server.neutralinoAuthPorts = {};
  await server.listen();

  log('Development server is running.', chalk.gray('Press CTRL+C to exit.'));
  log('Key commands available:\n');
  raw(' ', chalk.bgWhite.black.bold(' r '), '-', 'Reload the app');
  raw(' ', chalk.bgWhite.black.bold(' o '), '-', 'Open new app\n');

  process.stdin.setRawMode(true);
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  
  process.stdin.on('data', async (key) => {
    const keyStr = String(key);
    if (keyStr === '\u0003') process.exit(); // CTRL+C
    if (keyStr === 'r') {
      log('Reloading connected app(s)...');
      if (server.ws.clients.size < 1) return warn('No app(s) connected to reload. Make sure you have the app running.');
      server.ws.send({
        type: 'full-reload',
      });
    }
    if (keyStr === 'o') {
      log('Opening new app window...');
      const newNeu = await openNeu(url);
      server.neutralinoAuthPorts[newNeu.uuid] = newNeu.port;
    }
  });

  const newNeu = await openNeu(url);
  server.neutralinoAuthPorts[newNeu.uuid] = newNeu.port;
}