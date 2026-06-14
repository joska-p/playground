export type EntityType =
  | 'file'
  | 'function'
  | 'method'
  | 'type'
  | 'constant'
  | 'variable'
  | 'config-key'
  | 'package'
  | 'unknown';

export type GraphNode = {
  id: string;
  label: string;
  norm_label?: string;
  community: number;
  file_type: string;
  source_file: string;
  source_location: string;
  _origin?: string;
  /** Enriched at build time — entity kind derived from label pattern */
  entity_type?: EntityType;
  /** Enriched at build time — package name extracted from source_file */
  package_name?: string;
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
  /** Enriched at build time — semantic name from children labels */
  semantic_label?: string;
  /** Most common package within this community */
  dominant_package?: string;
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
