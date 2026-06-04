import type { GraphDataType, LinkData, NodeData } from '../schemas/graph.schema';

export type { GraphDataType, LinkData, NodeData };

export type Node3D = NodeData & {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  fx?: number | null;
  fy?: number | null;
  fz?: number | null;
};

export type Link3D = LinkData & {
  sourceId: string;
  targetId: string;
};

export type GraphLayout = {
  nodes: Node3D[];
  links: Link3D[];
};
