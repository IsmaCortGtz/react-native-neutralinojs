import type { ViteDevServer } from "vite";

export interface NeutralinoDevServer extends ViteDevServer {
  neutralinoAuthPorts: Record<string, number>;
}