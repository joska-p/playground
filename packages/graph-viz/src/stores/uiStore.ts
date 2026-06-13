import { create } from 'zustand';
import type { GraphNode } from '../types';

/** All known edge relation types — used for filtering */
export const RELATION_TYPES = [
  'contains',
  'imports',
  'imports_from',
  'calls',
  're_exports',
  'method',
  'references'
] as const;

export type RelationType = (typeof RELATION_TYPES)[number];

/** All entity types discovered during enrichment — used for filtering */
export const ENTITY_TYPES = [
  'function',
  'method',
  'type',
  'file',
  'variable',
  'config-key',
  'package',
  'unknown'
] as const;

export type EntityTypeLabel = (typeof ENTITY_TYPES)[number];

type UiStore = {
  selectedNode: GraphNode | null;
  hoveredCommunityId: number | null;
  hoveredNodeIndex: number | null;
  searchQuery: string;
  minCommunitySize: number;
  communityFilter: string;
  autoRotate: boolean;
  showEdges: boolean;
  showHyperedges: boolean;
  showNodeLabels: boolean;
  isPanelOpen: boolean;
  pointerX: number | null;
  pointerY: number | null;
  /** Which relation types are visible — empty = all visible */
  hiddenRelationTypes: Set<RelationType>;
  /** Which entity types to highlight — empty = all */
  entityTypeFilter: string;

  selectNode: (node: GraphNode | null) => void;
  setHoveredCommunityId: (id: number | null) => void;
  setHoveredNodeIndex: (idx: number | null) => void;
  setSearchQuery: (query: string) => void;
  setMinCommunitySize: (size: number) => void;
  setCommunityFilter: (filter: string) => void;
  setAutoRotate: (on: boolean) => void;
  setShowEdges: (on: boolean) => void;
  setShowHyperedges: (on: boolean) => void;
  setShowNodeLabels: (on: boolean) => void;
  togglePanel: () => void;
  setPointerPosition: (x: number, y: number) => void;
  /** Toggle a relation type on/off */
  toggleRelationType: (type: RelationType) => void;
  /** Set entity type filter */
  setEntityTypeFilter: (type: string) => void;
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
  showHyperedges: false,
  showNodeLabels: false,
  isPanelOpen: true,
  pointerX: null,
  pointerY: null,
  hiddenRelationTypes: new Set(),
  entityTypeFilter: '',

  selectNode: (selectedNode) => set({ selectedNode, hoveredNodeIndex: null }),

  setHoveredCommunityId: (hoveredCommunityId) => set({ hoveredCommunityId }),

  setHoveredNodeIndex: (hoveredNodeIndex) => set({ hoveredNodeIndex }),

  setSearchQuery: (searchQuery) => set({ searchQuery }),

  setMinCommunitySize: (minCommunitySize) => set({ minCommunitySize }),

  setCommunityFilter: (communityFilter) => {
    set({ communityFilter, selectedNode: null, hoveredNodeIndex: null });
  },

  setAutoRotate: (autoRotate) => set({ autoRotate }),

  setShowEdges: (showEdges) => set({ showEdges }),

  setShowHyperedges: (showHyperedges) => set({ showHyperedges }),

  setShowNodeLabels: (showNodeLabels) => set({ showNodeLabels }),

  togglePanel: () => set((s) => ({ isPanelOpen: !s.isPanelOpen })),

  setPointerPosition: (pointerX, pointerY) => set({ pointerX, pointerY }),

  toggleRelationType: (type) =>
    set((s) => {
      const next = new Set(s.hiddenRelationTypes);
      if (next.has(type)) next.delete(type);
      else next.add(type);
      return { hiddenRelationTypes: next };
    }),

  setEntityTypeFilter: (entityTypeFilter) => set({ entityTypeFilter })
}));
