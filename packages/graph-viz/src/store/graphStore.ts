import { create } from "zustand";
import type { RawNode } from "../data/graphData.types";
import type { ColorMode, GraphStats } from "./graphStore.types";

type GraphStore = {
  colorMode: ColorMode;
  filterFT: string | null;
  filterRel: string | null;
  search: string;
  showHyper: boolean;
  selectedNode: RawNode | null;
  isReady: boolean;
  stats: GraphStats;
};

const graphStore = create<GraphStore>(() => ({
  colorMode: "community",
  filterFT: null,
  filterRel: null,
  search: "",
  showHyper: true,
  selectedNode: null,
  isReady: false,
  stats: { nodes: 0, links: 0 },
}));

export function useGraphColorMode(): ColorMode {
  return graphStore((s) => s.colorMode);
}

export function useGraphFilterFT(): string | null {
  return graphStore((s) => s.filterFT);
}

export function useGraphFilterRel(): string | null {
  return graphStore((s) => s.filterRel);
}

export function useGraphSearch(): string {
  return graphStore((s) => s.search);
}

export function useGraphShowHyper(): boolean {
  return graphStore((s) => s.showHyper);
}

export function useGraphSelectedNode(): RawNode | null {
  return graphStore((s) => s.selectedNode);
}

export function useGraphIsReady(): boolean {
  return graphStore((s) => s.isReady);
}

export function useGraphStats(): GraphStats {
  return graphStore((s) => s.stats);
}

export function setGraphColorMode(colorMode: ColorMode): void {
  graphStore.setState({ colorMode });
}

export function setGraphFilterFT(filterFT: string | null): void {
  graphStore.setState({ filterFT });
}

export function setGraphFilterRel(filterRel: string | null): void {
  graphStore.setState({ filterRel });
}

export function setGraphSearch(search: string): void {
  graphStore.setState({ search });
}

export function toggleGraphHyper(): void {
  graphStore.setState((s) => ({ showHyper: !s.showHyper }));
}

export function setGraphSelectedNode(selectedNode: RawNode | null): void {
  graphStore.setState({ selectedNode });
}

export function setGraphIsReady(isReady: boolean): void {
  graphStore.setState({ isReady });
}

export function setGraphStats(stats: GraphStats): void {
  graphStore.setState({ stats });
}

export function resetGraphFilters(): void {
  graphStore.setState({ filterFT: null, filterRel: null, search: "", selectedNode: null });
}
