const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const findPort = require('../utils/findPort.js');
const { spawn } = require('child_process');
const { log, error } = require('../utils/log.js');
const root = process.cwd();

module.exports = async function openNeu(url) {
  // Check if neutralino.config.json exists
  if (!fs.existsSync(path.join(root, 'neutralino', 'neutralino.config.json'))) {
    error('neutralino.config.json not found in the /neutralino directory.');
    process.exit(1);
  }

  // Open log files for stdout and stderr
  const out = fs.openSync(path.join(root, 'neutralino', 'log', 'neu.log'), 'a');
  const err = fs.openSync(path.join(root, 'neutralino', 'log', 'neu.err.log'), 'a');
  const uuid = crypto.randomUUID();
  const port = await findPort();
  const newUrl = new URL(url);
  newUrl.searchParams.append('neutralinoReactNativeUid', uuid);

  // Change current directory to /neutralino and spawn neu process
  process.chdir(path.join(root, 'neutralino'));
  const neuProcess = spawn('neu', ['run', '--', `--url=${newUrl.toString()}`, `--port=${port}`, '--logging-write-to-log-file=false', '--logging-enabled=true', '--window-enable-inspector=true'], { stdio: ['ignore', out, err] });

  neuProcess.on('spawn', () => {
    log(`NeutralinoJS app started with UID: ${uuid}`);
  });
  
  neuProcess.on('close', (code) => {
    if (code === 0) return log(`NeutralinoJS app with UID: ${uuid} closed successfully.`);
    error(`NeutralinoJS app with UID: ${uuid} exited with code: ${code}`);
    process.exit(code);
  });

  // Restore original working directory
  process.chdir(root);
  return { uuid, port };
}