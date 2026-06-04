import type { SimLink, SimNode } from '../hooks/use-graph-simulation.types';

/**
 * Hierarchy levels for progressive disclosure
 */
export enum HierarchyLevel {
  CORE = 'core', // Hub nodes, community centers
  SECONDARY = 'secondary', // Connected to core nodes
  DETAIL = 'detail', // Peripheral nodes
}

export type NodeHierarchy = {
  level: HierarchyLevel;
  degree: number;
  betweenness: number; // Approximate centrality
  communitySize: number;
  communityRank: number; // Rank within its community (0 = hub)
  isHub: boolean; // Top 5% of nodes by degree in community
  importance: number; // 0-1 score for sorting
};

/**
 * Compute degree centrality for all nodes
 */
export function computeDegreeCentrality(
  nodes: SimNode[],
  links: SimLink[]
): Map<string, number> {
  const degree = new Map<string, number>();
  for (const node of nodes) {
    degree.set(node.id, 0);
  }
  for (const link of links) {
    const s =
      typeof link.source === 'object' ? link.source.id : String(link.source);
    const t =
      typeof link.target === 'object' ? link.target.id : String(link.target);
    degree.set(s, (degree.get(s) ?? 0) + 1);
    degree.set(t, (degree.get(t) ?? 0) + 1);
  }
  return degree;
}

/**
 * Approximate betweenness centrality using sample-based approach
 * (exact algorithm is O(n³), this is O(n*k) where k=samples)
 */
export function approximateBetweenness(
  nodes: SimNode[],
  links: SimLink[],
  samples: number = 100
): Map<string, number> {
  const between = new Map<string, number>();
  for (const node of nodes) {
    between.set(node.id, 0);
  }

  // Build adjacency list
  const adj = new Map<string, Set<string>>();
  for (const node of nodes) {
    adj.set(node.id, new Set());
  }
  for (const link of links) {
    const s =
      typeof link.source === 'object' ? link.source.id : String(link.source);
    const t =
      typeof link.target === 'object' ? link.target.id : String(link.target);
    adj.get(s)?.add(t);
    adj.get(t)?.add(s);
  }

  // Sample random pairs and run BFS
  for (let i = 0; i < samples && i < nodes.length; i++) {
    const source = nodes[Math.floor(Math.random() * nodes.length)];
    const target = nodes[Math.floor(Math.random() * nodes.length)];
    if (source.id === target.id) continue;

    // BFS to find shortest path
    const parent = new Map<string, string>();
    const queue = [source.id];
    parent.set(source.id, source.id);

    while (queue.length > 0) {
      const current = queue.shift()!;
      const neighbors = adj.get(current) || new Set();
      for (const neighbor of neighbors) {
        if (!parent.has(neighbor)) {
          parent.set(neighbor, current);
          queue.push(neighbor);
        }
      }
    }

    // Backtrack to mark nodes on shortest path
    if (parent.has(target.id)) {
      let current = target.id;
      while (current !== source.id) {
        const prev = parent.get(current)!;
        if (prev !== current) {
          between.set(current, (between.get(current) ?? 0) + 1);
        }
        current = prev;
      }
    }
  }

  return between;
}

/**
 * Compute community sizes and ranks
 */
export function computeCommunitySizes(
  nodes: SimNode[]
): Map<number, { size: number; nodes: SimNode[] }> {
  const communities = new Map<number, { size: number; nodes: SimNode[] }>();

  for (const node of nodes) {
    if (!communities.has(node.c)) {
      communities.set(node.c, { size: 0, nodes: [] });
    }
    const comm = communities.get(node.c)!;
    comm.size += 1;
    comm.nodes.push(node);
  }

  return communities;
}

/**
 * Build complete hierarchy for all nodes
 */
export function buildHierarchy(
  nodes: SimNode[],
  links: SimLink[],
  degreeMap: Map<string, number>,
  betweenMap: Map<string, number>
): Map<string, NodeHierarchy> {
  const hierarchy = new Map<string, NodeHierarchy>();
  const communities = computeCommunitySizes(nodes);

  // Compute stats for normalization
  const degrees = Array.from(degreeMap.values());
  const maxDegree = Math.max(...degrees, 1);
  const betweens = Array.from(betweenMap.values());
  const maxBetween = Math.max(...betweens, 1);

  // For each community, identify hubs (top 5%)
  const communityHubs = new Map<number, Set<string>>();
  for (const [commId, commData] of communities) {
    const sorted = [...commData.nodes].sort(
      (a, b) => (degreeMap.get(b.id) ?? 0) - (degreeMap.get(a.id) ?? 0)
    );
    const hubCount = Math.max(1, Math.ceil(sorted.length * 0.05));
    communityHubs.set(
      commId,
      new Set(sorted.slice(0, hubCount).map((n) => n.id))
    );
  }

  // Assign hierarchy levels
  for (const node of nodes) {
    const degree = degreeMap.get(node.id) ?? 0;
    const betweenness = betweenMap.get(node.id) ?? 0;
    const communityData = communities.get(node.c)!;
    const isHub = communityHubs.get(node.c)?.has(node.id) ?? false;

    // Rank within community by degree
    const communityRank =
      communityData.nodes
        .sort((a, b) => (degreeMap.get(b.id) ?? 0) - (degreeMap.get(a.id) ?? 0))
        .findIndex((n) => n.id === node.id) ?? 0;

    // Compute importance score (0-1)
    const degreeScore = degree / maxDegree;
    const betweenScore = betweenness / maxBetween;
    const importance = degreeScore * 0.6 + betweenScore * 0.4;

    // Determine level
    let level: HierarchyLevel;
    if (degree > maxDegree * 0.15 || isHub || communityData.size > 50) {
      level = HierarchyLevel.CORE;
    } else if (degree > maxDegree * 0.05 || communityData.size > 10) {
      level = HierarchyLevel.SECONDARY;
    } else {
      level = HierarchyLevel.DETAIL;
    }

    hierarchy.set(node.id, {
      level,
      degree,
      betweenness,
      communitySize: communityData.size,
      communityRank,
      isHub,
      importance,
    });
  }

  return hierarchy;
}

/**
 * Get statistics about the hierarchy distribution
 */
export function getHierarchyStats(hierarchy: Map<string, NodeHierarchy>) {
  let core = 0,
    secondary = 0,
    detail = 0;
  let maxImportance = 0;

  for (const h of hierarchy.values()) {
    if (h.level === HierarchyLevel.CORE) core++;
    else if (h.level === HierarchyLevel.SECONDARY) secondary++;
    else detail++;
    maxImportance = Math.max(maxImportance, h.importance);
  }

  return {
    total: hierarchy.size,
    core,
    secondary,
    detail,
    corePercent: ((core / hierarchy.size) * 100).toFixed(1),
    secondaryPercent: ((secondary / hierarchy.size) * 100).toFixed(1),
    detailPercent: ((detail / hierarchy.size) * 100).toFixed(1),
  };
}
