export type GraphNode = {
  id: string;
  label: string;
  file_type?: string;
  source_file?: string;
  source_location?: string;
  community?: number;
  norm_label?: string;
};

export type GraphLink = {
  source: string;
  target: string;
  relation?: string;
  confidence?: string;
  confidence_score?: number;
  weight?: number;
  source_file?: string;
  source_location?: string | null;
};

export type GraphHyperedge = {
  id: string;
  label: string;
  nodes: string[];
  relation?: string;
  confidence?: string;
  confidence_score?: number;
  source_file?: string;
};

export type GraphData = {
  nodes: GraphNode[];
  links?: GraphLink[];
  edges?: GraphLink[];
  hyperedges?: GraphHyperedge[];
  graph?: { hyperedges?: GraphHyperedge[] };
  directed?: boolean;
  multigraph?: boolean;
  built_at_commit?: string;
};

export type GraphVizProps = {
  data?: GraphData;
  width?: number;
  height?: number;
  maxNodes?: number;
  onNodeSelect?: (node: GraphNode | null) => void;
};
