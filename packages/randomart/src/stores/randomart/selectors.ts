import type { ExpressionNode } from '@repo/randomart-engine/types';
import { useStore } from 'zustand';
import { randomartStore } from './store';
import type { RandomartState } from './types';

// --- Direct Configuration Selectors ---
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
export function useRunning(): boolean {
  return useStore(randomartStore, (s) => s.running);
}
export function useAnimationSpeed(): number {
  return useStore(randomartStore, (s) => s.animationSpeed);
}
export function useTime(): number {
  return useStore(randomartStore, (s) => s.time);
}
export function useActiveAnimationBehaviorIds(): string[] {
  return useStore(randomartStore, (s) => s.activeAnimationBehaviorIds);
}

// --- Raw Channel Selectors ---
export function useTreeR(): ExpressionNode {
  return useStore(randomartStore, (s) => s.treeR);
}
export function useTreeG(): ExpressionNode {
  return useStore(randomartStore, (s) => s.treeG);
}
export function useTreeB(): ExpressionNode {
  return useStore(randomartStore, (s) => s.treeB);
}

// --- Defensive Structure Projection Selector ---
function getChannelIndex(s: RandomartState) {
  if (s.activeChannel === 'red') return 0;
  if (s.activeChannel === 'green') return 1;
  return 2;
}

export function useSelectedTree(): ExpressionNode {
  return useStore(randomartStore, (s) => {
    const rootTree =
      s.activeChannel === 'red' ? s.treeR : s.activeChannel === 'green' ? s.treeG : s.treeB;

    const idx = getChannelIndex(s);

    // Safely fetch channel-specific subtree, fallback cleanly to root context if layout shifts
    return rootTree.args[idx] ?? rootTree;
  });
}

export function useSelectedInitialHash(): number {
  return useStore(randomartStore, (s) => {
    const channel = s.activeChannel;
    const rng = channel === 'red' ? s.rngR : channel === 'green' ? s.rngG : s.rngB;
    return rng.initialHash;
  });
}

export function useSelectedChoiceCount(): number {
  return useStore(randomartStore, (s) => {
    const channel = s.activeChannel;
    const rng = channel === 'red' ? s.rngR : channel === 'green' ? s.rngG : s.rngB;
    return rng.choiceHistory.length || 0;
  });
}
