import { useStore } from 'zustand';
import { useShallow } from 'zustand/react/shallow';
import type { SeededRandom } from '../../core/random/SeededRandom';
import type { ExpressionNode } from '../../core/types';
import { randomartStore } from './store';
import type { RandomartState } from './types';

// — Whole state —
export function useRandomartState(): RandomartState {
  return useStore(randomartStore, (s) => s);
}

// — Config fields —
export function useSeedText(): string {
  return useStore(randomartStore, (s) => s.seedText);
}
export function useMaxDepth(): number {
  return useStore(randomartStore, (s) => s.maxDepth);
}
export function useEnabledRuleIds(): string[] {
  return useStore(randomartStore, (s) => s.enabledRuleIds);
}
export function useCorrelatedRGB(): boolean {
  return useStore(randomartStore, (s) => s.correlatedRGB);
}
export function useActiveChannel(): 'red' | 'green' | 'blue' {
  return useStore(randomartStore, (s) => s.activeChannel);
}
export function useRenderMode(): 'canvas' | 'glsl' {
  return useStore(randomartStore, (s) => s.renderMode);
}
export function useRunning(): boolean {
  return useStore(randomartStore, (s) => s.running);
}
export function useTime(): number {
  return useStore(randomartStore, (s) => s.time);
}

// — Derived artifacts —
export function useTreeR(): ExpressionNode {
  return useStore(randomartStore, (s) => s.treeR);
}
export function useTreeG(): ExpressionNode {
  return useStore(randomartStore, (s) => s.treeG);
}
export function useTreeB(): ExpressionNode {
  return useStore(randomartStore, (s) => s.treeB);
}
export function useRngR(): SeededRandom {
  return useStore(randomartStore, (s) => s.rngR);
}
export function useRngG(): SeededRandom {
  return useStore(randomartStore, (s) => s.rngG);
}
export function useRngB(): SeededRandom {
  return useStore(randomartStore, (s) => s.rngB);
}

// — Active channel selectors: only subscribe to the relevant tree/rng (fixes R6) —
export function useSelectedTree(): ExpressionNode {
  return useStore(randomartStore, (s) => {
    if (s.activeChannel === 'red') return s.treeR;
    if (s.activeChannel === 'green') return s.treeG;
    return s.treeB;
  });
}

export function useSelectedRng(): SeededRandom {
  return useStore(randomartStore, (s) => {
    if (s.activeChannel === 'red') return s.rngR;
    if (s.activeChannel === 'green') return s.rngG;
    return s.rngB;
  });
}

// — Canvas trees: CPU gets unwrapped, GLSL gets raw (fixes R4) —
export function useCPUTrees(): {
  treeR: ExpressionNode;
  treeG: ExpressionNode;
  treeB: ExpressionNode;
} {
  // Pass useShallow right into the selector wrapper itself
  return useStore(
    randomartStore,
    useShallow((s) => {
      if (s.correlatedRGB) {
        return {
          treeR: s.treeR.args[0] as ExpressionNode,
          treeG: s.treeR.args[1] as ExpressionNode,
          treeB: s.treeR.args[2] as ExpressionNode
        };
      }
      return { treeR: s.treeR, treeG: s.treeG, treeB: s.treeB };
    })
  );
}

export function useGLSLTrees(): {
  treeR: ExpressionNode;
  treeG: ExpressionNode;
  treeB: ExpressionNode;
} {
  return useStore(
    randomartStore,
    useShallow((s) => ({
      treeR: s.treeR,
      treeG: s.treeG,
      treeB: s.treeB
    }))
  );
}
