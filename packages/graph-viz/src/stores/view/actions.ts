import { graphStore } from './store';

export function initCommunities(communityIds: number[]): void {
  graphStore.setState({
    totalCommunities: communityIds.length,
    visibleCommunities: new Set(communityIds),
  });
}

export function selectNode(idx: number | null): void {
  graphStore.setState({ selectedNodeIdx: idx });
}

export function toggleEdges(): void {
  graphStore.setState((s) => ({ edgesVisible: !s.edgesVisible }));
}

export function toggleCommunity(communityId: number): void {
  graphStore.setState((s) => {
    const next = new Set(s.visibleCommunities);
    if (next.has(communityId)) {
      next.delete(communityId);
    } else {
      next.add(communityId);
    }
    return { visibleCommunities: next };
  });
}

export function showAllCommunities(): void {
  graphStore.setState((s) => ({
    visibleCommunities: new Set(
      Array.from({ length: s.totalCommunities }, (_, i) => i)
    ),
  }));
}

export function hideAllCommunities(): void {
  graphStore.setState({ visibleCommunities: new Set() });
}

export function toggleLabels(): void {
  graphStore.setState((s) => ({ labelsVisible: !s.labelsVisible }));
}
