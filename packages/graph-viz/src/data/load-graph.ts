import graphifyRaw from './graph.json';

import { graphifyGraphSchema } from './graphify-schema';
import type {
  GraphData,
  RawHyperedge,
  RawLink,
  RawNode,
} from './graph-data.schema';

function mapNode(raw: {
  id: string;
  label: string;
  file_type: string;
  source_file: string;
  community: number;
}): RawNode {
  return {
    id: raw.id,
    label: raw.label,
    ft: raw.file_type,
    sf: raw.source_file,
    c: raw.community,
  };
}

function mapLink(raw: {
  source: string;
  target: string;
  relation: string;
  weight: number;
}): RawLink {
  return {
    s: raw.source,
    t: raw.target,
    r: raw.relation,
    w: raw.weight,
  };
}

function mapHyperedge(raw: {
  id: string;
  label: string;
  nodes: string[];
  relation: string;
}): RawHyperedge {
  return {
    id: raw.id,
    label: raw.label,
    nodes: raw.nodes,
    rel: raw.relation,
  };
}

export function loadGraph(): GraphData {
  const graph = graphifyGraphSchema.parse(graphifyRaw);

  return {
    nodes: graph.nodes.map(mapNode),
    links: graph.links.map(mapLink),
    hyperedges: (graph.graph?.hyperedges ?? graph.hyperedges ?? []).map(
      mapHyperedge
    ),
  };
}
