import { create } from 'zustand';
import type { GraphState } from './types';

// Internal store — do not import this in components, use selectors.ts instead
export const graphStore = create<GraphState>(() => ({
  selectedNodeIdx: null,
  edgesVisible: true,
  visibleCommunities: new Set<number>(),
  totalCommunities: 0,
  labelsVisible: false,
}));
