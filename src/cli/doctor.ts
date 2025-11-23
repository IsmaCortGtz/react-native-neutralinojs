import { neuExists, binExists } from "@/neu/exists";
import init from '@/neu/init';
import update from '@/neu/update';

const isNeutralinoProjectInitialized = {
  label: 'neutralino is initialized',
  description: 'Checks if neutralino.config.json exists in the project root',
  runAutomaticFix: init,
  getDiagnostics: () => {
    const needsToBeFixed = !neuExists();
    return { needsToBeFixed };
  }
};

const areNeutralinoBinariesInstalled = {
  label: 'neutralino binaries are installed',
  description: 'Checks if neutralino binaries are installed in the project',
  runAutomaticFix: update,
  getDiagnostics: () => {
    const needsToBeFixed = !binExists();
    return { needsToBeFixed };
  }
};

export default [
  isNeutralinoProjectInitialized,
  areNeutralinoBinariesInstalled
];