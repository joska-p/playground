import { create } from 'zustand';

interface GraphState {
  /** Currently selected node index, null if nothing selected */
  selectedNodeIdx: number | null;
  /** Whether edges are visible */
  edgesVisible: boolean;
  /** Community IDs that are currently visible (empty = show all) */
  visibleCommunities: Set<number>;
  /** Total communities in the dataset */
  totalCommunities: number;

  /** Actions */
  selectNode: (idx: number | null) => void;
  toggleEdges: () => void;
  setEdgesVisible: (visible: boolean) => void;
  toggleCommunity: (communityId: number) => void;
  showAllCommunities: () => void;
  hideAllCommunities: () => void;
  initCommunities: (communities: number[]) => void;
}

export const useGraphStore = create<GraphState>((set) => ({
  selectedNodeIdx: null,
  edgesVisible: true,
  visibleCommunities: new Set<number>(),
  totalCommunities: 0,

  selectNode: (idx) => set({ selectedNodeIdx: idx }),
  toggleEdges: () => set((s) => ({ edgesVisible: !s.edgesVisible })),
  setEdgesVisible: (visible) => set({ edgesVisible: visible }),
  toggleCommunity: (communityId) =>
    set((s) => {
      const next = new Set(s.visibleCommunities);
      if (next.has(communityId)) {
        next.delete(communityId);
      } else {
        next.add(communityId);
      }
      return { visibleCommunities: next };
    }),
  showAllCommunities: () =>
    set((s) => ({
      visibleCommunities: new Set(
        Array.from({ length: s.totalCommunities }, (_, i) => i),
      ),
    })),
  hideAllCommunities: () => set({ visibleCommunities: new Set() }),
  initCommunities: (communities) =>
    set({
      totalCommunities: communities.length,
      visibleCommunities: new Set(communities),
    }),
}));
