import buildNeuProject from '@/neu/build';
import { printHeader } from '@/utils/art';

export default async function buildNeu() {
  printHeader();
  await buildNeuProject();
}