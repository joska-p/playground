import { create } from "zustand";
import type { ColorMode, GraphStats, RawNode, GraphData } from "../types";

type GraphState = {
  colorMode: ColorMode;
  filterFT: string | null;
  filterRel: string | null;
  search: string;
  showHyper: boolean;

  selectedNode: RawNode | null;

  isReady: boolean;
  stats: GraphStats;

  graphData: GraphData | null;

  setColorMode: (mode: ColorMode) => void;
  setFilterFT: (ft: string | null) => void;
  setFilterRel: (rel: string | null) => void;
  setSearch: (q: string) => void;
  toggleHyper: () => void;
  setSelectedNode: (node: RawNode | null) => void;
  setIsReady: (ready: boolean) => void;
  setStats: (stats: GraphStats) => void;
  resetFilters: () => void;
  setGraphData: (g: GraphData | null) => void;
};

export const useGraphStore = create<GraphState>((set) => ({
  colorMode: "community",
  filterFT: null,
  filterRel: null,
  search: "",
  showHyper: true,
  selectedNode: null,
  isReady: false,
  stats: { nodes: 0, links: 0 },
  graphData: null,

  setColorMode: (colorMode) => set({ colorMode }),
  setFilterFT: (filterFT) => set({ filterFT }),
  setFilterRel: (filterRel) => set({ filterRel }),
  setSearch: (search) => set({ search }),
  toggleHyper: () => set((s) => ({ showHyper: !s.showHyper })),
  setSelectedNode: (selectedNode) => set({ selectedNode }),
  setIsReady: (isReady) => set({ isReady }),
  setStats: (stats) => set({ stats }),
  resetFilters: () => set({ filterFT: null, filterRel: null, search: "" }),
  setGraphData: (g) => set({ graphData: g }),
}));
