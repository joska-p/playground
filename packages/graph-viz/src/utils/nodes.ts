import type { GraphLink, GraphNode } from '../types';

/**
 * Compute degree (number of incident edges) for each node.
 * Returns a Float32Array aligned with the nodes array.
 */
export function computeDegrees(
  nodes: GraphNode[],
  links: GraphLink[],
  nodeIndex: Map<string, number>
): Float32Array {
  const degrees = new Float32Array(nodes.length);
  for (const link of links) {
    const si = nodeIndex.get(link.source);
    const ti = nodeIndex.get(link.target);
    if (si !== undefined && ti !== undefined) {
      degrees[si]!++;
      degrees[ti]!++;
    }
  }
  return degrees;
}

/**
 * Map a degree value to a size (for visual scaling).
 */
export function degreeToSize(
  degree: number,
  maxDegree: number,
  minSize = 0.8,
  maxSize = 3
): number {
  if (maxDegree === 0) return minSize;
  return minSize + (degree / maxDegree) * (maxSize - minSize);
}

/**
 * Map a degree value to a brightness factor (0-1 range).
 * 0-degree nodes get dim, high-degree nodes get full brightness.
 */
export function degreeToBrightness(
  degree: number,
  maxDegree: number,
  minBrightness = 0.35
): number {
  if (maxDegree === 0) return 0.7;
  return minBrightness + (degree / maxDegree) * (1 - minBrightness);
}

export type NodeHealth = 'active' | 'low-confidence' | 'isolated';

export function classifyNodeHealth(
  nodeId: string,
  links: GraphLink[],
  degrees: Float32Array | null,
  _nodeIndex: Map<string, number>,
  idx: number
): NodeHealth {
  const deg = degrees?.[idx] ?? 0;
  if (deg === 0) return 'isolated';

  // Check if all edges for this node are INFERRED
  const nodeLinks = links.filter(
    (l) => l.source === nodeId || l.target === nodeId
  );
  const allInferred =
    nodeLinks.length > 0 &&
    nodeLinks.every(
      (l) =>
        l.confidence === 'INFERRED' ||
        (l.confidence_score !== undefined && l.confidence_score < 0.3)
    );
  if (allInferred) return 'low-confidence';

  return 'active';
}
