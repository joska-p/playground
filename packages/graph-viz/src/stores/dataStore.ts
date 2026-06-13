import { create } from 'zustand';
import type {
  CommunityData,
  GraphData,
  GraphNode,
  InterCommunityEdge,
  PreparedGraphData
} from '../types';

type DataStore = {
  graphData: GraphData | null;
  positions: Float32Array | null;
  degrees: Float32Array | null;
  nodeIndex: Map<string, number>;
  communities: Map<number, CommunityData>;
  interCommunityEdges: Map<string, InterCommunityEdge>;
  isLoaded: boolean;

  /** One-shot load from build-time prepared data — replaces worker + derivation path. */
  setPreparedData: (data: PreparedGraphData) => void;
};

function buildNodeIndex(nodes: GraphNode[]): Map<string, number> {
  const idx = new Map<string, number>();
  nodes.forEach((n, i) => idx.set(n.id, i));
  return idx;
}

export const useDataStore = create<DataStore>((set) => ({
  graphData: null,
  positions: null,
  degrees: null,
  nodeIndex: new Map(),
  communities: new Map(),
  interCommunityEdges: new Map(),
  isLoaded: false,

  setPreparedData: (data) => {
    const nodeIndex = buildNodeIndex(data.nodes);

    // Build the same structure `graphData` is typed as
    const graphData: GraphData = {
      directed: data.directed,
      multigraph: data.multigraph,
      graph: data.graph,
      nodes: data.nodes,
      links: data.links
    };

    const communities = new Map<number, CommunityData>();
    for (const [key, val] of Object.entries(data.communities)) {
      communities.set(Number(key), val);
    }

    const interCommunityEdges = new Map<string, InterCommunityEdge>(
      Object.entries(data.interCommunityEdges)
    );

    set({
      graphData,
      positions: Float32Array.from(data.positions),
      degrees: Float32Array.from(data.degrees),
      nodeIndex,
      communities,
      interCommunityEdges,
      isLoaded: true
    });
  }
}));
