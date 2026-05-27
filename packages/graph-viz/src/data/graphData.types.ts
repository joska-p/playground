export type RawNode = {
  id: string;
  label: string;
  ft: string;
  c: number;
  sf: string;
};

export type RawLink = {
  s: string;
  t: string;
  r: string;
  w: number;
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
