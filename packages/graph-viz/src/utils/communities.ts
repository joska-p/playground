import type { GraphNode, GraphLink, CommunityData } from '../types';
import { communityColor } from './colors';

export type InterCommunityEdge = {
  sourceCid: number;
  targetCid: number;
  count: number;
  relation?: string;
};

export function computeCommunities(
  nodes: GraphNode[],
  positions: Float32Array,
): Map<number, CommunityData> {
  // Group node indices by community
  const groups = new Map<number, number[]>();
  for (let i = 0; i < nodes.length; i++) {
    const cid = nodes[i]!.community;
    if (!groups.has(cid)) groups.set(cid, []);
    groups.get(cid)!.push(i);
  }

  const communities = new Map<number, CommunityData>();

  for (const [cid, indices] of groups) {
    // Centroid
    let cx = 0;
    let cy = 0;
    let cz = 0;
    for (const idx of indices) {
      cx += positions[idx * 3];
      cy += positions[idx * 3 + 1];
      cz += positions[idx * 3 + 2];
    }
    cx /= indices.length;
    cy /= indices.length;
    cz /= indices.length;

    // Label = most common source_file prefix
    const prefixCounts = new Map<string, number>();
    let hasTrash = false;
    for (const idx of indices) {
      const sf = nodes[idx]!.source_file;
      if (sf && sf.includes('.Trash-1000')) hasTrash = true;
      const parts = sf ? sf.split('/') : [];
      const prefix = parts.length >= 2 ? parts.slice(0, 2).join('/') : (parts[0] ?? 'unknown');
      prefixCounts.set(prefix, (prefixCounts.get(prefix) ?? 0) + 1);
    }
    const label = [...prefixCounts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? `C${cid}`;

    // Radius proportional to node count (cubic root for visual scale)
    const radius = Math.max(0.5, Math.cbrt(indices.length) * 1.5);

    communities.set(cid, {
      id: cid,
      centroid: [cx, cy, cz],
      nodeCount: indices.length,
      radius,
      label,
      color: communityColor(cid),
      nodeIndices: indices,
      hasTrash,
      interCommunityEdgeCount: 0,
      cohesion: 0,
    });
  }

  return communities;
}

export function computeInterCommunityEdges(
  links: GraphLink[],
  nodes: GraphNode[],
  nodeIndex: Map<string, number>,
  communities: Map<number, CommunityData>,
): Map<string, InterCommunityEdge> {
  const edgeMap = new Map<string, InterCommunityEdge>();

  for (const link of links) {
    const si = nodeIndex.get(link.source);
    const ti = nodeIndex.get(link.target);
    if (si === undefined || ti === undefined) continue;
    const sc = nodes[si]!.community;
    const tc = nodes[ti]!.community;
    if (sc === tc) continue;

    // Count relations too
    const key = `${Math.min(sc, tc)}-${Math.max(sc, tc)}`;
    const existing = edgeMap.get(key);
    if (existing) {
      existing.count++;
    } else {
      edgeMap.set(key, { sourceCid: sc, targetCid: tc, count: 1, relation: link.relation });
    }
  }

  // Update interCommunityEdgeCount on each community
  for (const edge of edgeMap.values()) {
    const sc = communities.get(edge.sourceCid);
    const tc = communities.get(edge.targetCid);
    if (sc) sc.interCommunityEdgeCount += edge.count;
    if (tc) tc.interCommunityEdgeCount += edge.count;
  }

  return edgeMap;
}

/**
 * Parse a community filter string like "1, 5, 12-20" into a Set of IDs.
 * Returns null when input is empty.
 */
export function parseCommunityFilter(input: string): Set<number> | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  const ids = new Set<number>();
  for (const part of trimmed.split(',')) {
    const p = part.trim();
    if (!p) continue;

    const range = p.match(/^(\d+)\s*-\s*(\d+)$/);
    if (range) {
      const start = Number.parseInt(range[1]!, 10);
      const end = Number.parseInt(range[2]!, 10);
      const lo = Math.min(start, end);
      const hi = Math.max(start, end);
      for (let i = lo; i <= hi; i++) ids.add(i);
    } else {
      const n = Number.parseInt(p, 10);
      if (!Number.isNaN(n)) ids.add(n);
    }
  }

  return ids.size > 0 ? ids : null;
}

export type FilteredSubset = {
  positions: Float32Array;
  nodes: GraphNode[];
  links: GraphLink[];
  nodeIndex: Map<string, number>;
};

export function filterByCommunity(
  communityId: number,
  positions: Float32Array,
  nodes: GraphNode[],
  links: GraphLink[],
): FilteredSubset | null {
  // Build map of which original indices belong to this community
  const communityNodeIds = new Map<string, number>();
  const communityIndices: number[] = [];

  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i]!.community === communityId) {
      communityIndices.push(i);
      communityNodeIds.set(nodes[i]!.id, communityIndices.length - 1);
    }
  }

  if (communityIndices.length === 0) return null;

  // Build filtered positions
  const filteredPos = new Float32Array(communityIndices.length * 3);
  const filteredNodes: GraphNode[] = [];

  for (let i = 0; i < communityIndices.length; i++) {
    const origIdx = communityIndices[i]!;
    filteredPos[i * 3] = positions[origIdx * 3];
    filteredPos[i * 3 + 1] = positions[origIdx * 3 + 1];
    filteredPos[i * 3 + 2] = positions[origIdx * 3 + 2];
    filteredNodes.push(nodes[origIdx]!);
  }

  // Filter links
  const filteredLinks = links.filter(
    (l) => communityNodeIds.has(l.source) && communityNodeIds.has(l.target),
  );

  return {
    positions: filteredPos,
    nodes: filteredNodes,
    links: filteredLinks,
    nodeIndex: communityNodeIds,
  };
}
