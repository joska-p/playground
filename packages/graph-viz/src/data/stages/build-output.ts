import { PALETTE } from '../../config.js';
import type { GraphData, GraphLink, GraphNode } from '../graphData.types.js';
import type { SimLink, SimNode } from './sim-types.js';

export type BuildOutputResult = {
  result: GraphData;
  stats: string[];
};

function deriveCommunityName(nodes: Pick<GraphNode, 'id'>[]): string {
  const prefixCounts = new Map<string, number>();
  for (const n of nodes) {
    const id = n.id.replace(/\(.*\)$/, '');
    const parts = id.split('_');
    for (let d = 2; d <= 4 && d <= parts.length; d++) {
      const prefix = parts.slice(0, d).join('/');
      prefixCounts.set(prefix, (prefixCounts.get(prefix) || 0) + 1);
    }
  }
  const sorted = [...prefixCounts.entries()].sort(
    (a, b) => b[1] - a[1] || b[0].length - a[0].length
  );
  let name = sorted[0]?.[0] ?? 'unknown';
  for (const [prefix, count] of sorted) {
    const parts = prefix.split('/');
    if (
      (parts[0] === 'packages' || parts[0] === 'apps') &&
      parts.length <= 3 &&
      count >= 3
    ) {
      name = prefix;
      break;
    }
  }
  if (name.startsWith('packages/')) name = name.slice('packages/'.length);
  if (name.startsWith('apps/')) name = name.slice('apps/'.length);
  return name.replace(/\//g, ' / ');
}

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
    file_type: n.file_type,
    color: '#888888'
  }));

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

  const communityNodes = new Map<number, Pick<GraphNode, 'id'>[]>();
  for (const n of nodes) {
    if (!communityNodes.has(n.community)) communityNodes.set(n.community, []);
    communityNodes.get(n.community)!.push(n);
  }

  const communityNames = new Map<number, string>();
  for (const [id, members] of communityNodes) {
    communityNames.set(id, deriveCommunityName(members));
  }

  const communities: GraphData['communities'] = [];

  const communitySizeRank = Array.from(commAccum.entries())
    .sort((a, b) => b[1].count - a[1].count)
    .map(([id], rank) => ({ id, color: PALETTE[rank % PALETTE.length] }));

  const communityColor = new Map<number, string>();
  for (const c of communitySizeRank) {
    communityColor.set(c.id, c.color);
  }

  for (const [id, data] of commAccum) {
    communities.push({
      id,
      name: communityNames.get(id) ?? `Group ${id}`,
      color: communityColor.get(id)!,
      centroid: {
        x: data.sumX / data.count,
        y: data.sumY / data.count,
        z: data.sumZ / data.count
      }
    });
  }

  for (const node of nodes) {
    node.color = communityColor.get(node.community) ?? '#888888';
  }

  return {
    result: { nodes, links, communities },
    stats
  };
}
