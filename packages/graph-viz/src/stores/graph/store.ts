import { create } from 'zustand';
import type { RawNode } from '../../data/graph-data.schema';

export type ColorMode = 'community' | 'filetype';

export type GraphStats = {
  nodes: number;
  links: number;
};

type GraphStore = {
  colorMode: ColorMode;
  filterFT: string | undefined;
  filterRel: string | undefined;
  search: string;
  showHyper: boolean;
  selectedNode: RawNode | undefined;
  isReady: boolean;
  stats: GraphStats;
};

const graphStore = create<GraphStore>(() => ({
  colorMode: 'community',
  filterFT: undefined,
  filterRel: undefined,
  search: '',
  showHyper: true,
  selectedNode: undefined,
  isReady: false,
  stats: { nodes: 0, links: 0 },
}));

export function useColorMode(): ColorMode {
  return graphStore((s) => s.colorMode);
}

export function useFilterFT(): string | undefined {
  return graphStore((s) => s.filterFT);
}

export function useFilterRel(): string | undefined {
  return graphStore((s) => s.filterRel);
}

export function useSearch(): string {
  return graphStore((s) => s.search);
}

export function useShowHyper(): boolean {
  return graphStore((s) => s.showHyper);
}

export function useSelectedNode(): RawNode | undefined {
  return graphStore((s) => s.selectedNode);
}

export function useIsReady(): boolean {
  return graphStore((s) => s.isReady);
}

export function useStats(): GraphStats {
  return graphStore((s) => s.stats);
}

export function setColorMode(colorMode: ColorMode): void {
  graphStore.setState({ colorMode });
}

export function setFilterFT(filterFT: string | undefined): void {
  graphStore.setState({ filterFT });
}

export function setFilterRel(filterRel: string | undefined): void {
  graphStore.setState({ filterRel });
}

export function setSearch(search: string): void {
  graphStore.setState({ search });
}

export function toggleHyper(): void {
  graphStore.setState((s) => ({ showHyper: !s.showHyper }));
}

export function setSelectedNode(selectedNode: RawNode | undefined): void {
  graphStore.setState({ selectedNode });
}

export function setIsReady(isReady: boolean): void {
  graphStore.setState({ isReady });
}

export function setStats(stats: GraphStats): void {
  graphStore.setState({ stats });
}

export function resetFilters(): void {
  graphStore.setState({
    filterFT: undefined,
    filterRel: undefined,
    search: '',
    selectedNode: undefined,
  });
}
