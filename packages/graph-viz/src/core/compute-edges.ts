import type { GraphLink, GraphNode } from '../data/graphData.schema';

export type EdgeBuffers = {
  connectedPositions: Float32Array;
  disconnectedPositions: Float32Array;
};

export function computeEdgeBuffers(
  nodes: GraphNode[],
  links: GraphLink[],
  edgesVisible: boolean,
  visibleCommunities: Set<number>,
  selectedNodeIdx: number | null
): EdgeBuffers {
  const EMPTY = new Float32Array();

  if (!edgesVisible) {
    return { connectedPositions: EMPTY, disconnectedPositions: EMPTY };
  }

  const connArr: number[] = [];
  const discArr: number[] = [];

  for (let i = 0; i < links.length; i++) {
    const link = links[i];
    const source = nodes[link.sourceIdx];
    const target = nodes[link.targetIdx];

    if (
      !visibleCommunities.has(source.community) ||
      !visibleCommunities.has(target.community)
    ) {
      continue;
    }

    const isConnected =
      selectedNodeIdx !== null &&
      (link.sourceIdx === selectedNodeIdx ||
        link.targetIdx === selectedNodeIdx);

    const buf = isConnected ? connArr : discArr;
    buf.push(source.x, source.y, source.z, target.x, target.y, target.z);
  }

  return {
    connectedPositions: new Float32Array(connArr),
    disconnectedPositions:
      selectedNodeIdx !== null ? new Float32Array(discArr) : EMPTY
  };
}
