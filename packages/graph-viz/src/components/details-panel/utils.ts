import type { GraphLink, GraphNode } from '../../data/graphData.types';

function getStats(nodes: GraphNode[], links: GraphLink[]) {
  const communities = new Set(nodes.map((n) => n.community));
  const fileTypes = new Map<string, number>();
  for (const n of nodes) {
    fileTypes.set(n.file_type, (fileTypes.get(n.file_type) ?? 0) + 1);
  }
  return {
    nodeCount: nodes.length,
    edgeCount: links.length,
    communityCount: communities.size,
    fileTypes: [...fileTypes.entries()].sort((a, b) => b[1] - a[1])
  };
}

function getConnections(nodes: GraphNode[], links: GraphLink[], idx: number) {
  const incoming: GraphNode[] = [];
  const outgoing: GraphNode[] = [];
  for (const { sourceIdx, targetIdx } of links) {
    if (targetIdx === idx) incoming.push(nodes[sourceIdx]);
    if (sourceIdx === idx) outgoing.push(nodes[targetIdx]);
  }
  return { incoming, outgoing };
}

export { getConnections, getStats };
