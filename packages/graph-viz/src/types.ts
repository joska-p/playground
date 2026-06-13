export type GraphNode = {
  id: string;
  label: string;
  norm_label?: string;
  community: number;
  file_type: string;
  source_file: string;
  source_location: string;
  _origin?: string;
};

export type GraphLink = {
  source: string;
  target: string;
  relation: string;
  weight: number;
  confidence?: string;
  confidence_score?: number;
  source_file?: string;
  source_location?: string;
};

export type GraphData = {
  directed: boolean;
  multigraph: boolean;
  graph: {
    hyperedges?: Array<{
      id: string;
      label: string;
      nodes: string[];
      relation: string;
      confidence?: string;
      confidence_score?: number;
      source_file?: string;
    }>;
  };
  nodes: GraphNode[];
  links: GraphLink[];
};

export type LayoutInput = {
  nodes: GraphNode[];
  links: GraphLink[];
  center: [number, number, number];
  radius: number;
};

export type CommunityData = {
  id: number;
  centroid: [number, number, number];
  nodeCount: number;
  radius: number;
  label: string;
  color: string;
  nodeIndices: number[];
  hasTrash: boolean;
  interCommunityEdgeCount: number;
  cohesion: number;
  /** Max extent across all axes — used for detail-view normalization. Precomputed at build time. */
  spread: number;
};

export type InterCommunityEdge = {
  sourceCid: number;
  targetCid: number;
  count: number;
  relation?: string;
  sourceToTargetCount: number;
  targetToSourceCount: number;
};

/**
 * Build-time prepared graph data.
 *
 * All derived data (positions, degrees, community metadata, inter-community edges)
 * is precomputed by `src/data/prepare.ts` so the runtime app needs zero computation.
 */
export type PreparedGraphData = {
  directed: boolean;
  multigraph: boolean;
  graph: GraphData['graph'];
  nodes: GraphNode[];
  links: GraphLink[];

  /** Flat Float32Array serialized as number[] — 3 values per node. */
  positions: number[];
  /** Per-node degree (connection count). */
  degrees: number[];
  /** Community metadata keyed by community ID. */
  communities: Record<string, CommunityData>;
  /** Inter-community edges keyed by "sourceCid-targetCid". */
  interCommunityEdges: Record<string, InterCommunityEdge>;
};
