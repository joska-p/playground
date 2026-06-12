export type GraphNode = {
  id: string;
  label: string;
  norm_label?: string;
  community: number;
  file_type: string;
  source_file: string;
  source_location: string;
  _origin?: string;
}

export type GraphLink = {
  source: string;
  target: string;
  relation: string;
  weight: number;
  confidence?: string;
  confidence_score?: number;
  source_file?: string;
  source_location?: string;
}

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
}

export type LayoutInput = {
  nodes: GraphNode[];
  links: GraphLink[];
  center: [number, number, number];
  radius: number;
}

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
}
