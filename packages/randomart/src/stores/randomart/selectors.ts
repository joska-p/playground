import type { ExpressionNode } from '@repo/randomart-engine/types';
import { useStore } from 'zustand';
import { randomartStore } from './store';

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

export function useSelectedTree(): ExpressionNode {
  return useStore(randomartStore, (s) => {
    return s.activeChannel === 'red' ? s.treeR : s.activeChannel === 'green' ? s.treeG : s.treeB;
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
