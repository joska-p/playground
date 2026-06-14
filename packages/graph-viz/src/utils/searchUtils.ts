import type { GraphNode } from '../types';

/**
 * Compute search-highlighted node indices for a detail view (within a subset of nodes).
 * Returns a Set of local indices matching the query, or null if no matches.
 */
export function computeSearchHighlights(
  searchQuery: string,
  nodes: GraphNode[]
): Set<number> | null {
  const trimmed = searchQuery.trim();
  if (!trimmed) return null;

  const q = trimmed.toLowerCase();
  const indices = new Set<number>();
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i]!;
    if (
      node.label.toLowerCase().includes(q) ||
      node.id.toLowerCase().includes(q)
    ) {
      indices.add(i);
    }
  }
  return indices.size > 0 ? indices : null;
}

export type OverviewSearchHighlights = {
  matchingCommunityIds: Set<number>;
};

/**
 * Compute search-highlighted communities for overview mode.
 * Matches against node labels/IDs and community labels.
 */
export function computeOverviewSearchHighlights(
  searchQuery: string,
  nodes: GraphNode[],
  communities: Map<number, { label: string }>
): OverviewSearchHighlights | null {
  const trimmed = searchQuery.trim();
  if (!trimmed) return null;

  const q = trimmed.toLowerCase();
  const matchingNodeIndices = new Set<number>();
  const matchingCommunityIds = new Set<number>();

  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i]!;
    if (
      node.label.toLowerCase().includes(q) ||
      node.id.toLowerCase().includes(q)
    ) {
      matchingNodeIndices.add(i);
      matchingCommunityIds.add(node.community);
    }
  }

  for (const [cid, comm] of communities) {
    if (comm.label.toLowerCase().includes(q)) {
      matchingCommunityIds.add(cid);
    }
  }

  if (matchingNodeIndices.size === 0 && matchingCommunityIds.size === 0) {
    return null;
  }

  return { matchingCommunityIds };
}

/**
 * Compute connected node indices within a node subset for a selected node.
 * Returns a Set of local indices that are connected via any link.
 */
export function computeConnectedNodeIndices(
  selectedNodeId: string,
  nodes: GraphNode[],
  links: Array<{ source: string; target: string }>
): Set<number> {
  const ids = new Set<string>();
  ids.add(selectedNodeId);

  for (const link of links) {
    if (link.source === selectedNodeId) ids.add(link.target);
    if (link.target === selectedNodeId) ids.add(link.source);
  }

  const indices = new Set<number>();
  for (let i = 0; i < nodes.length; i++) {
    if (ids.has(nodes[i]!.id)) {
      indices.add(i);
    }
  }
  return indices;
}

/**
 * Find the index of a specific node within a nodes array.
 */
export function findNodePosition(
  targetNode: GraphNode,
  nodes: GraphNode[],
  positions: Float32Array
): [number, number, number] | null {
  const idx = nodes.indexOf(targetNode);
  if (idx === -1) return null;
  return [positions[idx * 3], positions[idx * 3 + 1], positions[idx * 3 + 2]];
}

/**
 * Compute smart labels for overview: filter communities by threshold
 * (based on camera distance) and visibility, then sort by size and limit count.
 */
export function computeSmartLabels<T extends { nodeCount: number; id: number }>(
  communities: Map<number, T> | ReadonlyArray<T>,
  cameraDistance: number,
  baseThreshold: number,
  distanceScale: number,
  maxLabels: number,
  visibleIds?: Set<number> | null
): T[] {
  const threshold = baseThreshold * (1 + cameraDistance / distanceScale);
  const items =
    communities instanceof Map ? [...communities.values()] : [...communities];

  return items
    .filter((c) => {
      if (visibleIds && !visibleIds.has(c.id)) return false;
      return c.nodeCount >= threshold;
    })
    .sort((a, b) => b.nodeCount - a.nodeCount)
    .slice(0, maxLabels);
}
