const { neuExists } = require('./exists');
const { execSync } = require('child_process');
const { log, error } = require('../utils/log');

module.exports = async function initializeNeuProject() {
  if (neuExists()) return log('Neutralino project already initialized.');
  log('Initializing Neutralino project...');
    
  try {
    execSync('neu create neutralino --template=IsmaCortGtz/neutralnojs-react-native', { stdio: 'pipe' });
    log('Neutralino project initialized successfully!');
  } catch (e) {
    error('Error initializing Neutralino project:', e?.stderr?.toString() || e.message);
    process.exit(1);
  }
}