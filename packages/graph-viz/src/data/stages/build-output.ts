/**
 * Stage 4: Map simulation results back to the output schema
 * and compute community centroids.
 */
import type { GraphData, GraphLink, GraphNode } from '../graphData.types.js';
import type { SimLink, SimNode } from './sim-types.js';

// ── Result ───────────────────────────────────────────────────────────────────

export type BuildOutputResult = {
  result: GraphData;
  stats: string[];
};

// ── Stage implementation ─────────────────────────────────────────────────────

export function buildOutput(
  simNodes: SimNode[],
  simLinks: SimLink[]
): BuildOutputResult {
  const stats: string[] = [];

  const nodes: GraphNode[] = simNodes.map((n) => ({
    id: n.id,
    label: n.label,
    x: n.x ?? 0,
    y: n.y ?? 0,
    z: n.z ?? 0,
    inDegree: n.inDegree,
    outDegree: n.outDegree,
    community: n.community,
    file_type: n.file_type
  }));

  // Build an index to resolve link endpoints
  const nodeById = new Map<string, SimNode>();
  for (const n of simNodes) {
    nodeById.set(n.id, n);
  }

  const nodeIndex = new Map<string, number>();
  for (let i = 0; i < nodes.length; i++) {
    nodeIndex.set(nodes[i].id, i);
  }

  const links: GraphLink[] = simLinks.map((l) => {
    const srcObj =
      typeof l.source === 'object' ? l.source : nodeById.get(l.source)!;
    const tgtObj =
      typeof l.target === 'object' ? l.target : nodeById.get(l.target)!;
    return {
      sourceIdx: nodeIndex.get(srcObj.id)!,
      targetIdx: nodeIndex.get(tgtObj.id)!,
      relation: l.relation
    };
  });

  // Compute community centroids
  const commAccum = new Map<
    number,
    { sumX: number; sumY: number; sumZ: number; count: number }
  >();
  for (const n of nodes) {
    let acc = commAccum.get(n.community);
    if (!acc) {
      acc = { sumX: 0, sumY: 0, sumZ: 0, count: 0 };
      commAccum.set(n.community, acc);
    }
    acc.sumX += n.x;
    acc.sumY += n.y;
    acc.sumZ += n.z;
    acc.count += 1;
  }

  const communities: GraphData['communities'] = [];
  for (const [id, data] of commAccum) {
    communities.push({
      id,
      centroid: {
        x: data.sumX / data.count,
        y: data.sumY / data.count,
        z: data.sumZ / data.count
      }
    });
  }

  return {
    result: { nodes, links, communities },
    stats
  };
}
