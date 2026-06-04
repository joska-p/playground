import { create } from 'zustand';
import type { RawNode } from '../../data/graph-data.schema';
import type { NodeHierarchy } from '../../utils/hierarchy';

export type ColorMode = 'community' | 'filetype';

export type GraphStats = {
  nodes: number;
  links: number;
};

export type HierarchyStats = {
  total: number;
  core: number;
  secondary: number;
  detail: number;
  corePercent: string;
  secondaryPercent: string;
  detailPercent: string;
};

type HierarchyVisibilityMode = 'core' | 'core-secondary' | 'all';

type GraphStore = {
  colorMode: ColorMode;
  filterFT: string | undefined;
  filterRel: string | undefined;
  search: string;
  showHyper: boolean;
  selectedNode: RawNode | undefined;
  isReady: boolean;
  stats: GraphStats;
  hierarchyStats: HierarchyStats | null;
  hierarchyVisibility: HierarchyVisibilityMode;
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
  hierarchyStats: null,
  hierarchyVisibility: 'core-secondary',
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

export function useHierarchyStats(): HierarchyStats | null {
  return graphStore((s) => s.hierarchyStats);
}

export function useHierarchyVisibility(): HierarchyVisibilityMode {
  return graphStore((s) => s.hierarchyVisibility);
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

export function setHierarchyStats(hierarchyStats: HierarchyStats): void {
  graphStore.setState({ hierarchyStats });
}

export function setHierarchyVisibility(
  hierarchyVisibility: HierarchyVisibilityMode
): void {
  graphStore.setState({ hierarchyVisibility });
}

export function cycleHierarchyVisibility(): void {
  graphStore.setState((s) => ({
    hierarchyVisibility:
      s.hierarchyVisibility === 'core'
        ? 'core-secondary'
        : s.hierarchyVisibility === 'core-secondary'
          ? 'all'
          : 'core',
  }));
}

export function resetFilters(): void {
  graphStore.setState({
    filterFT: undefined,
    filterRel: undefined,
    search: '',
    selectedNode: undefined,
  });
}
