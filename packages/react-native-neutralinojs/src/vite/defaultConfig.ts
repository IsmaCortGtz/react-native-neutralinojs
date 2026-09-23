import reactNativeNeu from '@/vite/customPlugin';
import { netAuthProxyPlugin, neuAuthPlugin } from '@/vite/neuAuthPlugin';

export default async function defaultViteConfig() {
  try {
    return {
      root: 'neutralino',
      build: {
        outDir: 'vite-dist',
      },
      logLevel: 'warn',
      server: { port: 8082 },
      plugins: [neuAuthPlugin(), netAuthProxyPlugin(), reactNativeNeu()],
    }
  } catch {
    return {};
  }
}