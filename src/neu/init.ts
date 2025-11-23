import { execSync } from "node:child_process";
import { neuExists } from "@/neu/exists";
import { log, error } from "@/utils/log";

export default async function initializeNeuProject() {
  if (neuExists()) return log('Neutralino project already initialized.');
  log('Initializing Neutralino project...');
    
  try {
    execSync('neu create neutralino --template=IsmaCortGtz/neutralinojs-react-native', { stdio: 'pipe' });
    log('Neutralino project initialized successfully!');
  } catch (e: any) {
    error('Error initializing Neutralino project:', e?.stderr?.toString() || e?.message || e);
    process.exit(1);
  }
}