import { create } from 'zustand';
import type { GraphDataState } from './types';

export const graphDataStore = create<GraphDataState>(() => ({
  nodes: [],
  links: [],
  communities: [],
}));
