import { generateCpu } from "./cpu.js";
import { generateMemory } from "./memory.js";
import { generateNetwork } from "./network.js";
import { generateWalker } from "./walker.js";
import { generateCursor } from "./cursor.js";
import type { CpuRule, MemoryRule, NetworkRule, WalkerRule, CursorRule } from "../types.js";

export interface Generators {
  cpu: (rule?: CpuRule, current?: number, timestamp?: number) => number;
  memory: (rule?: MemoryRule, current?: number, timestamp?: number) => number;
  network: (rule?: NetworkRule, current?: number, timestamp?: number) => number;
  walker: (
    rule?: WalkerRule,
    current?: { x: number; y: number },
    timestamp?: number,
    bounds?: { width: number; height: number }
  ) => { x: number; y: number };
  cursor: (
    rule?: CursorRule,
    current?: { x: number; y: number },
    timestamp?: number
  ) => { x: number; y: number };
}

export const generators: Generators = {
  cpu: generateCpu,
  memory: generateMemory,
  network: generateNetwork,
  walker: generateWalker,
  cursor: generateCursor,
};

export { generateCpu, generateMemory, generateNetwork, generateWalker, generateCursor };
