import { useStore } from 'zustand';
import type { SeededRandom } from '../../core/random/SeededRandom';
import type { ExpressionNode } from '../../core/types';
import { randomartStore } from './store';
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

// — Active channel selectors: only subscribe to the relevant tree/rng (fixes R6) —
export function useSelectedTree(): ExpressionNode {
  return useStore(randomartStore, (s) => {
    const tree =
      s.activeChannel === 'red'
        ? s.treeR
        : s.activeChannel === 'green'
          ? s.treeG
          : s.treeB;
    if (s.correlatedRGB) {
      const idx =
        s.activeChannel === 'red' ? 0 : s.activeChannel === 'green' ? 1 : 2;
      return tree.args[idx] as ExpressionNode;
    }
    return tree;
  });
}

export function useSelectedRng(): SeededRandom {
  return useStore(randomartStore, (s) => {
    if (s.activeChannel === 'red') return s.rngR;
    if (s.activeChannel === 'green') return s.rngG;
    return s.rngB;
  });
}
