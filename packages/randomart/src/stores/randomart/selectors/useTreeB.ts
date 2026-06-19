import { useStore } from 'zustand';
import type { ExpressionNode } from '../../../core/types';
import { randomartStore } from '../store';

export function useTreeB(): ExpressionNode {
  return useStore(randomartStore, (s) => s.treeB);
}
