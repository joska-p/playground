import type { GraphLink, GraphNode } from '../../../types';
import { classifyNodeHealth } from '../../../utils/nodes';
import type { NodeHealth } from '../../../utils/nodes';

export type NodeHealthGroups = Record<NodeHealth, number[]>;

/**
 * Classify node indices into health groups (active, low-confidence, isolated)
 * based on their degree and edge confidence.
 */
export function useNodeHealthGroups(
  nodes: GraphNode[],
  allLinks: GraphLink[],
  degrees: Float32Array | null,
  nodeIndex: Map<string, number>
): NodeHealthGroups {
  const groups: NodeHealthGroups = {
    active: [],
    'low-confidence': [],
    isolated: [],
  };
  for (let i = 0; i < nodes.length; i++) {
    const health = classifyNodeHealth(
      nodes[i]!.id,
      allLinks,
      degrees,
      nodeIndex,
      i
    );
    groups[health].push(i);
  }
  return groups;
}
