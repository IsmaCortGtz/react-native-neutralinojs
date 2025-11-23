import path from 'node:path';
import fs from 'node:fs';
import { defineConfig } from 'rolldown';

export default defineConfig({
  input: [
    'src/cli/build-neu.ts',
    'src/cli/doctor.ts',
    'src/cli/init-neu.ts',
    'src/cli/run-neu.ts',
    'src/cli/update-neu.ts',
  ],
  platform: 'node',
  external: ['fs', 'http', 'path', 'os', 'child_process', 'net', 'vite', 'chalk', '@vitejs/plugin-react', 'vite-plugin-commonjs', '@bunchtogether/vite-plugin-flow'],
  output: {
    dir: 'dist',
    format: 'cjs',
    minify: false,
    preserveModules: true,
    preserveModulesRoot: "src",
  },
  plugins: [
    {
      name: "alias",
      resolveId(source, importer) {
        if (source.startsWith("@/")) {
          const resolved = path.resolve(process.cwd(), "src", source.slice(2));

          // prueba con .ts
          if (fs.existsSync(resolved + ".ts")) {
            return resolved + ".ts";
          }

          // prueba con .js (por si usas JS generado)
          if (fs.existsSync(resolved + ".js")) {
            return resolved + ".js";
          }

          return resolved; // fallback
        }
        return null;
      }
    }
  ]
});