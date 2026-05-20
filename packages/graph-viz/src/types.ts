import type * as d3 from "d3";

// ── Raw data shapes (as produced by Graphify) ─────────────────────────────────

export type RawNode = {
  id: string;
  label: string;
  ft: string; // file_type
  c: number; // community
  sf: string; // source_file
};

export type RawLink = {
  s: string; // source id
  t: string; // target id
  r: string; // relation
  w: number; // confidence_score / weight
};

export type RawHyperedge = {
  id: string;
  label: string;
  nodes: string[];
  rel: string;
};

export type GraphData = {
  nodes: RawNode[];
  links: RawLink[];
  hyperedges: RawHyperedge[];
};

// ── D3 simulation types ───────────────────────────────────────────────────────

/** Node extended with D3 simulation mutable fields */
export type SimNode = {
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
} & RawNode &
  d3.SimulationNodeDatum;

/** Link with typed D3 source/target resolution */
export type SimLink = {
  s: string;
  t: string;
  r: string;
  w: number;
} & d3.SimulationLinkDatum<SimNode>;

// ── UI state types ─────────────────────────────────────────────────────────────

export type ColorMode = "community" | "filetype";

export type GraphStats = {
  nodes: number;
  links: number;
};
