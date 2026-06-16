/**
 * Simulation-internal node type.
 * Extends the d3 datum so it can go into the force simulation.
 * Not exported to consumers — only used within the pipeline stages.
 */
export type SimNode = {
  index?: number;
  id: string;
  label: string;
  norm_label: string;
  file_type: string;
  community: number;
  inDegree: number;
  outDegree: number;
  x?: number;
  y?: number;
  z?: number;
  vx?: number;
  vy?: number;
  vz?: number;
};

export type SimLink = {
  source: SimNode | string;
  target: SimNode | string;
  relation: string;
};
