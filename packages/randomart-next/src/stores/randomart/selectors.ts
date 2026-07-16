import type { ExprNode } from '@repo/randomart-engine-next';
import { useStore } from 'zustand';
import { randomartStore } from './store';

// --- Mode Selectors ---
export function useMode() {
  return useStore(randomartStore, (s) => s.mode);
}

// --- Direct Configuration Selectors ---
export function useSeedText() {
  return useStore(randomartStore, (s) => s.seedText);
}
export function useMaxDepth() {
  return useStore(randomartStore, (s) => s.maxDepth);
}
export function useSelectedRuleId() {
  return useStore(randomartStore, (s) => s.selectedRuleId);
}
export function useCustomOperators() {
  return useStore(randomartStore, (s) => s.customOperators);
}
export function useMinDepth() {
  return useStore(randomartStore, (s) => s.minDepth);
}
export function useCorrelatedRGB() {
  return useStore(randomartStore, (s) => s.correlatedRGB);
}
export function useActiveChannel() {
  return useStore(randomartStore, (s) => s.activeChannel);
}
export function useRunning() {
  return useStore(randomartStore, (s) => s.running);
}
export function useAnimationSpeed() {
  return useStore(randomartStore, (s) => s.animationSpeed);
}
export function useTime() {
  return useStore(randomartStore, (s) => s.time);
}
export function useActiveAnimationBehaviorIds() {
  return useStore(randomartStore, (s) => s.activeAnimationBehaviorIds);
}

// --- Raw Channel Selectors ---
export function useTreeR(): ExprNode {
  return useStore(randomartStore, (s) => s.treeR);
}
export function useTreeG(): ExprNode {
  return useStore(randomartStore, (s) => s.treeG);
}
export function useTreeB(): ExprNode {
  return useStore(randomartStore, (s) => s.treeB);
}

export function useSelectedTree(): ExprNode {
  return useStore(randomartStore, (s) => {
    return s.activeChannel === 'red' ? s.treeR : s.activeChannel === 'green' ? s.treeG : s.treeB;
  });
}
