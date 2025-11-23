import initNeuProject from '@/neu/init';
import updateNeuProject from '@/neu/update';
import { binExists } from '@/neu/exists';
import { printHeader } from '@/utils/art';

export default async function initNeu() {
  printHeader();
  await initNeuProject();
  if (!binExists()) await updateNeuProject();
}