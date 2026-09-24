import { defineConfig } from 'vitest/config';
import { projects as newAppScreenProjects } from './packages/new-app-screen/vitest.config.mts';
import { projects as reactNativeNeutralinojsProjects } from './packages/react-native-neutralinojs/vitest.config.mts';

export default defineConfig({
  test: {
    passWithNoTests: true,
    projects: [
      ...reactNativeNeutralinojsProjects,
      ...newAppScreenProjects,
    ],
  },
});
