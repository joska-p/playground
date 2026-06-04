import { useEffect, useRef } from 'react';
import type { SimLink, SimNode } from './use-graph-simulation.types';
import {
  buildHierarchy,
  computeDegreeCentrality,
  approximateBetweenness,
  getHierarchyStats,
  type NodeHierarchy,
} from '../utils/hierarchy';

export type UseHierarchyReturn = {
  hierarchyRef: React.MutableRefObject<Map<string, NodeHierarchy>>;
  getNodeLevel: (nodeId: string) => string;
  getNodeImportance: (nodeId: string) => number;
  stats: ReturnType<typeof getHierarchyStats>;
};

/**
 * Hook to compute and manage node hierarchies
 * Call this after nodes/links are loaded in useGraphSimulation
 */
export function useHierarchy(
  nodes: SimNode[],
  links: SimLink[]
): UseHierarchyReturn {
  const hierarchyRef = useRef<Map<string, NodeHierarchy>>(new Map());
  const statsRef = useRef(getHierarchyStats(new Map()));

  useEffect(() => {
    if (nodes.length === 0 || links.length === 0) {
      hierarchyRef.current = new Map();
      statsRef.current = getHierarchyStats(new Map());
      return;
    }

    // Compute centrality measures
    const degreeMap = computeDegreeCentrality(nodes, links);
    const betweenMap = approximateBetweenness(
      nodes,
      links,
      Math.min(200, nodes.length)
    );

    // Build hierarchy
    const hierarchy = buildHierarchy(nodes, links, degreeMap, betweenMap);
    hierarchyRef.current = hierarchy;
    statsRef.current = getHierarchyStats(hierarchy);

    // Log distribution
    console.log('📊 Hierarchy Distribution:', statsRef.current);
  }, [nodes, links]);

  return {
    hierarchyRef,
    getNodeLevel: (nodeId: string) => {
      return hierarchyRef.current.get(nodeId)?.level ?? 'unknown';
    },
    getNodeImportance: (nodeId: string) => {
      return hierarchyRef.current.get(nodeId)?.importance ?? 0;
    },
    stats: statsRef.current,
  };
}
