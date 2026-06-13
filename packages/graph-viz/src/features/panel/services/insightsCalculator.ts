import type { CommunityData, GraphData, InterCommunityEdge } from '../../../types';
import { classifyNodeHealth } from '../../../utils/nodes';

export type GraphInsights = {
  concentration: string;
  couplingDensity: string;
  isolated: number;
  lowConfidence: number;
  maxCoupling: number;
  maxCouplingPair: string;
};

/**
 * Compute codebase health insights from graph data.
 * Returns stats on community concentration, coupling density,
 * node health (isolated/low-confidence), and strongest coupling pair.
 */
export function computeGraphInsights(
  graphData: GraphData,
  degrees: Float32Array,
  nodeIndex: Map<string, number>,
  communities: Map<number, CommunityData>,
  interCommunityEdges: Map<string, InterCommunityEdge>
): GraphInsights | null {
  // Top 10 community concentration
  const sortedComms = [...communities.values()].sort(
    (a, b) => b.nodeCount - a.nodeCount
  );
  const top10Nodes = sortedComms
    .slice(0, 10)
    .reduce((sum, c) => sum + c.nodeCount, 0);
  const concentration = (
    (top10Nodes / graphData.nodes.length) *
    100
  ).toFixed(0);

  // Coupling density
  const totalPossiblePairs =
    (communities.size * (communities.size - 1)) / 2;
  const actualPairs = interCommunityEdges.size;
  const couplingDensity =
    totalPossiblePairs > 0
      ? ((actualPairs / totalPossiblePairs) * 100).toFixed(1)
      : '0.0';

  // Health counts
  let isolated = 0;
  let lowConfidence = 0;
  for (let i = 0; i < graphData.nodes.length; i++) {
    const health = classifyNodeHealth(
      graphData.nodes[i]!.id,
      graphData.links,
      degrees,
      nodeIndex,
      i
    );
    if (health === 'isolated') isolated++;
    else if (health === 'low-confidence') lowConfidence++;
  }

  // Most coupled community pair
  let maxCoupling = 0;
  let maxCouplingPair = '';
  for (const edge of interCommunityEdges.values()) {
    if (edge.count > maxCoupling) {
      maxCoupling = edge.count;
      const a = communities.get(edge.sourceCid);
      const b = communities.get(edge.targetCid);
      const aLabel = a?.label ?? `C${edge.sourceCid}`;
      const bLabel = b?.label ?? `C${edge.targetCid}`;
      maxCouplingPair = `${aLabel} ↔ ${bLabel}`;
    }
  }

  return {
    concentration,
    couplingDensity,
    isolated,
    lowConfidence,
    maxCoupling,
    maxCouplingPair,
  };
}

/**
 * Find connected neighbors of a node within a set of links.
 * Returns sorted array of { node, relation } pairs, ordered by neighbor degree descending.
 */
export function findNodeNeighbors(
  nodeId: string,
  nodes: GraphData['nodes'],
  links: GraphData['links'],
  nodeIndex: Map<string, number>,
  degrees: Float32Array | null
): Array<{ node: (typeof nodes)[number]; relation: string }> {
  const neighbors: Array<{ node: (typeof nodes)[number]; relation: string }> = [];

  for (const link of links) {
    if (link.source === nodeId) {
      const targetIdx = nodeIndex.get(link.target);
      if (targetIdx !== undefined) {
        neighbors.push({
          node: nodes[targetIdx]!,
          relation: link.relation,
        });
      }
    } else if (link.target === nodeId) {
      const sourceIdx = nodeIndex.get(link.source);
      if (sourceIdx !== undefined) {
        neighbors.push({
          node: nodes[sourceIdx]!,
          relation: link.relation,
        });
      }
    }
  }

  neighbors.sort((a, b) => {
    const degA = degrees?.[nodeIndex.get(a.node.id)!] ?? 0;
    const degB = degrees?.[nodeIndex.get(b.node.id)!] ?? 0;
    return degB - degA;
  });

  return neighbors;
}

/**
 * Get linked communities for a selected community from inter-community edges,
 * sorted by edge count descending, limited to maxResults.
 */
export function getLinkedCommunities(
  selectedCommunityId: number,
  interCommunityEdges: Map<string, InterCommunityEdge>,
  communities: Map<number, CommunityData>,
  maxResults = 8
): Array<{
  otherCid: number;
  other: CommunityData;
  count: number;
}> {
  const linkedEdges = [...interCommunityEdges.values()]
    .filter(
      (e) =>
        e.sourceCid === selectedCommunityId ||
        e.targetCid === selectedCommunityId
    )
    .sort((a, b) => b.count - a.count)
    .slice(0, maxResults);

  return linkedEdges
    .map((e) => {
      const otherCid =
        e.sourceCid === selectedCommunityId
          ? e.targetCid
          : e.sourceCid;
      const other = communities.get(otherCid);
      if (!other) return null;
      return { otherCid, other, count: e.count };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);
}
