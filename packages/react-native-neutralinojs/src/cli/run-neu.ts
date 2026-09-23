import runNeuProject from '@/neu/run';
import initNeuProject from '@/neu/init';
import { printHeader } from '@/utils/art';

export default async function runNeu() {
  printHeader();
  await initNeuProject();
  await runNeuProject();
}