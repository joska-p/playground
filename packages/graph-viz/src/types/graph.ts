import type { GraphDataType, LinkData, NodeData } from '../schemas/graph.schema';

export type { GraphDataType, LinkData, NodeData };

export interface Node3D extends NodeData {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  fx?: number | null;
  fy?: number | null;
  fz?: number | null;
}

export interface Link3D extends LinkData {
  sourceId: string;
  targetId: string;
}

export interface GraphLayout {
  nodes: Node3D[];
  links: Link3D[];
}
