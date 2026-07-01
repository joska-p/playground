import type { GraphLink, GraphNode } from '../core/pipeline/graphData.schema';

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

  if (!edgesVisible && selectedNodeIdx === null) {
    return { connectedPositions: EMPTY, disconnectedPositions: EMPTY };
  }

  const connArr: number[] = [];
  const discArr: number[] = [];

  for (const link of links) {
    const source = nodes[link.sourceIdx];
    const target = nodes[link.targetIdx];

    if (
      !source ||
      !target ||
      (visibleCommunities.size > 0 && !visibleCommunities.has(source.community)) ||
      (visibleCommunities.size > 0 && !visibleCommunities.has(target.community))
    ) {
      continue;
    }

    const isConnected =
      selectedNodeIdx !== null &&
      (link.sourceIdx === selectedNodeIdx || link.targetIdx === selectedNodeIdx);

    if (isConnected) {
      connArr.push(source.x, source.y, source.z, target.x, target.y, target.z);
    } else if (edgesVisible) {
      discArr.push(source.x, source.y, source.z, target.x, target.y, target.z);
    }
  }

  return {
    connectedPositions: connArr.length > 0 ? new Float32Array(connArr) : EMPTY,
    disconnectedPositions: discArr.length > 0 ? new Float32Array(discArr) : EMPTY
  };
}
