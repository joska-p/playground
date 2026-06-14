export type GraphNode = {
  id: string;
  label: string;
  x: number;
  y: number;
  z: number;
  inDegree: number;
  outDegree: number;
  community: number;
  file_type: string;
};

export type GraphLink = {
  sourceIdx: number;
  targetIdx: number;
  relation: string;
};

export type GraphData = {
  nodes: GraphNode[];
  links: GraphLink[];
  communities: { id: number; centroid: { x: number; y: number; z: number } }[];
};
