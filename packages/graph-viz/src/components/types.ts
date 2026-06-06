// graph/types.ts — shared data interfaces

// Fix: Pull out the three types into a top-level import statement
import type {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  InstancedMesh,
  LineSegments,
} from 'three';

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

export type GraphVisualizationProps = {
  data?: GraphData;
  width?: number;
  height?: number;
  maxNodes?: number;
  onNodeSelect?: (node: GraphNode | null) => void;
};

/** Mutable spherical-coordinate camera state (stored in a ref). */
export type Spherical = {
  theta: number;
  phi: number;
  radius: number;
};

/** Everything the Three.js scene exposes to the rest of the component. */
export type ThreeContext = {
  renderer: WebGLRenderer;
  scene: Scene;
  camera: PerspectiveCamera;
  mesh: InstancedMesh;
  lines: LineSegments;
  nodes: GraphNode[];
  idToIdx: Map<string, number>;
};
