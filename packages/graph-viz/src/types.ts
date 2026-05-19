export type GraphNode = {
  id: string;
  label: string;
  file_type: "code" | "document" | "paper" | "image" | "rationale";
  source_file: string;
  source_location: string | null;
  source_url: string | null;
  captured_at: string | null;
  author: string | null;
  contributor: string | null;
  community?: number;
  norm_label?: string;
};

export type GraphEdge = {
  source: string;
  target: string;
  relation: string;
  confidence: "EXTRACTED" | "INFERRED" | "AMBIGUOUS";
  confidence_score: number;
  source_file: string;
  source_location?: string | null;
  weight: number;
};

export type Hyperedge = {
  id: string;
  label: string;
  nodes: string[];
  relation: string;
  confidence: "EXTRACTED" | "INFERRED";
  confidence_score: number;
  source_file: string;
};

export type GraphData = {
  directed: boolean;
  multigraph: boolean;
  graph: {
    hyperedges: Hyperedge[];
  };
  nodes: GraphNode[];
  links: GraphEdge[];
  built_at_commit?: string;
};

export type SelectedNode = {
  node: GraphNode;
  edges: GraphEdge[];
};
