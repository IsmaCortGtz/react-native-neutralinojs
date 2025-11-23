import updateNeuProject from '@/neu/update';
import { printHeader } from '@/utils/art';

export default async function updateNeu() {
  printHeader();
  await updateNeuProject();
}