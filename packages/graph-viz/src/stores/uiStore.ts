import { create } from 'zustand';
import type { GraphNode } from '../types';

type UiStore = {
  selectedNode: GraphNode | null;
  searchQuery: string;
  minCommunitySize: number;
  communityFilter: string;
  autoRotate: boolean;
  showEdges: boolean;
  isPanelOpen: boolean;

  selectNode: (node: GraphNode | null) => void;
  setSearchQuery: (query: string) => void;
  setMinCommunitySize: (size: number) => void;
  setCommunityFilter: (filter: string) => void;
  setAutoRotate: (on: boolean) => void;
  setShowEdges: (on: boolean) => void;
  togglePanel: () => void;
};

export const useUiStore = create<UiStore>((set) => ({
  selectedNode: null,
  searchQuery: '',
  minCommunitySize: 1,
  communityFilter: '',
  autoRotate: true,
  showEdges: true,
  isPanelOpen: true,

  selectNode: (selectedNode) => set({ selectedNode }),

  setSearchQuery: (searchQuery) => set({ searchQuery }),

  setMinCommunitySize: (minCommunitySize) => set({ minCommunitySize }),

  setCommunityFilter: (communityFilter) => {
    // Single action for ALL community selection paths.
    // Single numeric ID → component derives detail mode.
    // Empty/multi → component derives overview mode.
    set({ communityFilter, selectedNode: null });
  },

  setAutoRotate: (autoRotate) => set({ autoRotate }),

  setShowEdges: (showEdges) => set({ showEdges }),

  togglePanel: () => set((s) => ({ isPanelOpen: !s.isPanelOpen })),
}));
