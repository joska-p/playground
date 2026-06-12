import { create } from 'zustand';
import type { CommunityData, GraphData, GraphNode } from '../types';
import type { InterCommunityEdge } from '../utils/communities';
import {
  computeCommunities,
  computeInterCommunityEdges
} from '../utils/communities';
import { computeDegrees } from '../utils/nodes';

type DataStore = {
  graphData: GraphData | null;
  positions: Float32Array | null;
  degrees: Float32Array | null;
  nodeIndex: Map<string, number>;
  communities: Map<number, CommunityData>;
  interCommunityEdges: Map<string, InterCommunityEdge>;
  isLoaded: boolean;

  setGraphData: (data: GraphData) => void;
  setPositions: (positions: Float32Array) => void;
};

function buildNodeIndex(nodes: GraphNode[]): Map<string, number> {
  const idx = new Map<string, number>();
  nodes.forEach((n, i) => idx.set(n.id, i));
  return idx;
}

export const useDataStore = create<DataStore>((set, get) => ({
  graphData: null,
  positions: null,
  degrees: null,
  nodeIndex: new Map(),
  communities: new Map(),
  interCommunityEdges: new Map(),
  isLoaded: false,

  setGraphData: (graphData) => {
    const nodeIndex = buildNodeIndex(graphData.nodes);
    set({ graphData, nodeIndex });
  },

  setPositions: (positions) => {
    const { graphData, nodeIndex } = get();
    if (!graphData) return;

    const degrees = computeDegrees(graphData.nodes, graphData.links, nodeIndex);
    const communities = computeCommunities(graphData.nodes, positions);
    const interCommunityEdges = computeInterCommunityEdges(
      graphData.links,
      graphData.nodes,
      nodeIndex,
      communities
    );

    set({
      positions,
      degrees,
      communities,
      interCommunityEdges,
      isLoaded: true
    });
  }
}));
