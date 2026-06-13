import { create } from 'zustand';
import type { GraphNode } from '../types';

type UiStore = {
  selectedNode: GraphNode | null;
  hoveredCommunityId: number | null;
  hoveredNodeIndex: number | null;
  searchQuery: string;
  minCommunitySize: number;
  communityFilter: string;
  autoRotate: boolean;
  showEdges: boolean;
  showNodeLabels: boolean;
  isPanelOpen: boolean;
  pointerX: number | null;
  pointerY: number | null;

  selectNode: (node: GraphNode | null) => void;
  setHoveredCommunityId: (id: number | null) => void;
  setHoveredNodeIndex: (idx: number | null) => void;
  setSearchQuery: (query: string) => void;
  setMinCommunitySize: (size: number) => void;
  setCommunityFilter: (filter: string) => void;
  setAutoRotate: (on: boolean) => void;
  setShowEdges: (on: boolean) => void;
  setShowNodeLabels: (on: boolean) => void;
  togglePanel: () => void;
  setPointerPosition: (x: number, y: number) => void;
};

export const useUiStore = create<UiStore>((set) => ({
  selectedNode: null,
  hoveredCommunityId: null,
  hoveredNodeIndex: null,
  searchQuery: '',
  minCommunitySize: 1,
  communityFilter: '',
  autoRotate: false,
  showEdges: true,
  showNodeLabels: false,
  isPanelOpen: true,
  pointerX: null,
  pointerY: null,

  selectNode: (selectedNode) => set({ selectedNode, hoveredNodeIndex: null }),

  setHoveredCommunityId: (hoveredCommunityId) => set({ hoveredCommunityId }),

  setHoveredNodeIndex: (hoveredNodeIndex) => set({ hoveredNodeIndex }),

  setSearchQuery: (searchQuery) => set({ searchQuery }),

  setMinCommunitySize: (minCommunitySize) => set({ minCommunitySize }),

  setCommunityFilter: (communityFilter) => {
    // Single action for ALL community selection paths.
    // Single numeric ID → component derives detail mode.
    // Empty/multi → component derives overview mode.
    set({ communityFilter, selectedNode: null, hoveredNodeIndex: null });
  },

  setAutoRotate: (autoRotate) => set({ autoRotate }),

  setShowEdges: (showEdges) => set({ showEdges }),

  setShowNodeLabels: (showNodeLabels) => set({ showNodeLabels }),

  togglePanel: () => set((s) => ({ isPanelOpen: !s.isPanelOpen })),

  setPointerPosition: (pointerX, pointerY) => set({ pointerX, pointerY })
}));
