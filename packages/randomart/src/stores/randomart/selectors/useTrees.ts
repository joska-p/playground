import { useStore } from 'zustand';
import type { ExpressionNode } from '../../../core/types';
import { randomartStore } from '../store';

export function useTreeR(): ExpressionNode {
  return useStore(randomartStore, (s) => s.treeR);
}

export function useTreeG(): ExpressionNode {
  return useStore(randomartStore, (s) => s.treeG);
}

export function useTreeB(): ExpressionNode {
  return useStore(randomartStore, (s) => s.treeB);
}
