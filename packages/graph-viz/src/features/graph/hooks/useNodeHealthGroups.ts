import type { GraphLink, GraphNode } from '../../../types';
import type { NodeHealth } from '../../../utils/nodes';
import { classifyNodeHealth } from '../../../utils/nodes';

export type NodeHealthGroups = Record<NodeHealth, number[]>;

/**
 * Classify node indices into health groups (active, low-confidence, isolated)
 * based on their degree and edge confidence.
 *
 * Builds a nodeId → GraphLink[] adjacency map once (O(L)) then classifies
 * each node in O(1) — total O(N + L) instead of the naive O(N × L).
 */
export function useNodeHealthGroups(
  nodes: GraphNode[],
  allLinks: GraphLink[],
  degrees: Float32Array | null
): NodeHealthGroups {
  // Build adjacency map once
  const linksByNode = new Map<string, GraphLink[]>();
  for (const l of allLinks) {
    if (!linksByNode.has(l.source)) linksByNode.set(l.source, []);
    if (!linksByNode.has(l.target)) linksByNode.set(l.target, []);
    linksByNode.get(l.source)!.push(l);
    linksByNode.get(l.target)!.push(l);
  }

  const groups: NodeHealthGroups = {
    active: [],
    'low-confidence': [],
    isolated: []
  };
  for (let i = 0; i < nodes.length; i++) {
    const health = classifyNodeHealth(
      nodes[i]!.id,
      linksByNode,
      degrees,
      i
    );
    groups[health].push(i);
  }
  return groups;
}
