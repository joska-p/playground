/**
 * Stage 1: Parse raw graph JSON into simulation-ready nodes and links,
 * computing in/out degree for each node.
 */
import type { SimLink, SimNode } from './sim-types.js';

// ── Raw input types (mirrors graphify output) ────────────────────────────────

export type RawNode = {
  id: string;
  label?: string;
  norm_label?: string;
  file_type?: string;
  community?: number;
  [key: string]: unknown;
};

export type RawLink = {
  source: string;
  target: string;
  relation?: string;
  [key: string]: unknown;
};

export type RawGraph = {
  nodes: RawNode[];
  links: RawLink[];
};

// ── Result ───────────────────────────────────────────────────────────────────

export type ParseResult = {
  simNodes: SimNode[];
  simLinks: SimLink[];
  stats: string[];
};

// ── Stage implementation ─────────────────────────────────────────────────────

export function parseGraph(raw: RawGraph): ParseResult {
  const { nodes, links } = raw;
  const stats: string[] = [`Read ${nodes.length} nodes, ${links.length} links`];

  // Build simulation node array & degree computation
  const simNodes: SimNode[] = nodes.map((n) => ({
    id: n.id,
    label: n.label ?? n.norm_label ?? n.id,
    norm_label: n.norm_label ?? n.label ?? n.id,
    file_type: n.file_type ?? 'unknown',
    community: n.community ?? 0,
    inDegree: 0,
    outDegree: 0
  }));

  const nodeById = new Map<string, SimNode>();
  for (const n of simNodes) {
    nodeById.set(n.id, n);
  }

  for (const link of links) {
    const src = nodeById.get(link.source);
    const tgt = nodeById.get(link.target);
    if (src) src.outDegree += 1;
    if (tgt) tgt.inDegree += 1;
  }

  stats.push(
    `In-memory graph: ${simNodes.length} nodes, max in-degree ${Math.max(...simNodes.map((n) => n.inDegree))}, max out-degree ${Math.max(...simNodes.map((n) => n.outDegree))}`
  );

  // Build simulation links (keep relation)
  const simLinks: SimLink[] = [];
  for (const link of links) {
    const src = nodeById.get(link.source);
    const tgt = nodeById.get(link.target);
    if (src && tgt) {
      simLinks.push({
        source: src,
        target: tgt,
        relation: link.relation ?? 'unknown'
      });
    }
  }
  stats.push(
    `Simulation links: ${simLinks.length} (${links.length - simLinks.length} dropped due to missing endpoints)`
  );

  return { simNodes, simLinks, stats };
}
