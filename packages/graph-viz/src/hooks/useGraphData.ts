import { useMemo } from 'react';

import type {
  GraphData,
  GraphHyperedge,
  GraphLink,
  GraphNode,
} from '../core/graph.types';

type GraphDataResult = {
  nodes: GraphNode[];
  links: GraphLink[];
  hyperedges: GraphHyperedge[];
};

/**
 * Derives the filtered/capped node, link, and hyperedge arrays from raw graph
 * data. Memoised so downstream hooks only re-run when the input data changes.
 */
function useGraphData(data: GraphData, maxNodes: number): GraphDataResult {
  return useMemo(() => {
    const raw = data ?? { nodes: [] };
    const nodes = raw.nodes.slice(0, maxNodes);
    const nodeSet = new Set(nodes.map((n) => n.id));
    const links = (raw.links ?? raw.edges ?? []).filter(
      (l) => nodeSet.has(l.source) && nodeSet.has(l.target)
    );
    const hyperedges = raw.hyperedges ?? raw.graph?.hyperedges ?? [];
    return { nodes, links, hyperedges };
  }, [data, maxNodes]);
}

export { useGraphData };
