import { BufferGeometry, Float32BufferAttribute } from 'three';
import { communityLink, directedEdge } from '../../../config';
import type { CommunityData, InterCommunityEdge } from '../../../types';
import { hexToRgb } from '../../../utils/colors';

export type Tier = 0 | 1 | 2;

const TIER_OPACITIES: Record<Tier, number> = { 0: 0.1, 1: 0.4, 2: 0.8 };

export type CommunityEdgeGeometries = {
  geometries: Record<
    Tier,
    { geometry: BufferGeometry; opacity: number } | null
  >;
  arrowheads: Array<{
    from: [number, number, number];
    to: [number, number, number];
    color: string;
  }>;
  hasEdges: boolean;
};

/**
 * Build inter-community edge geometries split by coupling tier,
 * plus directional arrowheads for strongly directional relationships.
 */
export function buildCommunityEdgeGeometries(
  interCommunityEdges: Map<string, InterCommunityEdge>,
  communities: Map<number, CommunityData>,
  visibleIds: Set<number> | null | undefined,
  minCount: number,
  tierThresholds: readonly [number, number, number]
): CommunityEdgeGeometries {
  const allEdges = [...interCommunityEdges.values()].filter((e) => {
    if (e.count < minCount) return false;
    if (!visibleIds) return true;
    return visibleIds.has(e.sourceCid) && visibleIds.has(e.targetCid);
  });

  if (allEdges.length === 0) {
    return {
      geometries: { 0: null, 1: null, 2: null },
      arrowheads: [],
      hasEdges: false
    };
  }

  const [, lowThreshold, highThreshold] = tierThresholds;

  // Group edges by coupling tier
  const tiers: Record<Tier, InterCommunityEdge[]> = { 0: [], 1: [], 2: [] };
  for (const e of allEdges) {
    if (e.count < lowThreshold) {
      tiers[0].push(e);
    } else if (e.count < highThreshold) {
      tiers[1].push(e);
    } else {
      tiers[2].push(e);
    }
  }

  // Build BufferGeometry per tier
  const geometries: Record<
    Tier,
    { geometry: BufferGeometry; opacity: number } | null
  > = {
    0: null,
    1: null,
    2: null
  };

  for (const tier of [0, 1, 2] as Tier[]) {
    const edges = tiers[tier];
    if (edges.length === 0) continue;

    const verts = new Float32Array(edges.length * 6);
    const colors = new Float32Array(edges.length * 6);

    for (let i = 0; i < edges.length; i++) {
      const e = edges[i]!;
      const sc = communities.get(e.sourceCid);
      const tc = communities.get(e.targetCid);
      if (!sc || !tc) continue;

      const [sx, sy, sz] = sc.centroid;
      const [tx, ty, tz] = tc.centroid;

      verts[i * 6] = sx;
      verts[i * 6 + 1] = sy;
      verts[i * 6 + 2] = sz;
      verts[i * 6 + 3] = tx;
      verts[i * 6 + 4] = ty;
      verts[i * 6 + 5] = tz;

      const scRgb = hexToRgb(sc.color);
      const tcRgb = hexToRgb(tc.color);

      colors[i * 6] = scRgb[0];
      colors[i * 6 + 1] = scRgb[1];
      colors[i * 6 + 2] = scRgb[2];
      colors[i * 6 + 3] = tcRgb[0];
      colors[i * 6 + 4] = tcRgb[1];
      colors[i * 6 + 5] = tcRgb[2];
    }

    const geo = new BufferGeometry();
    geo.setAttribute('position', new Float32BufferAttribute(verts, 3));
    geo.setAttribute('color', new Float32BufferAttribute(colors, 3));

    geometries[tier] = { geometry: geo, opacity: TIER_OPACITIES[tier] };
  }

  // Build directional arrowheads
  const arrowheads: Array<{
    from: [number, number, number];
    to: [number, number, number];
    color: string;
  }> = [];

  for (const e of allEdges) {
    const total = e.sourceToTargetCount + e.targetToSourceCount;
    if (total === 0) continue;

    const ratio =
      Math.max(e.sourceToTargetCount, e.targetToSourceCount) / total;
    if (ratio <= 0.7) continue;

    const sc = communities.get(e.sourceCid);
    const tc = communities.get(e.targetCid);
    if (!sc || !tc) continue;

    const from: [number, number, number] =
      e.sourceToTargetCount > e.targetToSourceCount ? sc.centroid : tc.centroid;
    const to: [number, number, number] =
      e.sourceToTargetCount > e.targetToSourceCount ? tc.centroid : sc.centroid;

    arrowheads.push({ from, to, color: directedEdge.arrowColor });
  }

  return { geometries, arrowheads, hasEdges: true };
}

/**
 * Build cross-community link geometries for a selected community's detail view.
 */
export function buildCommunityLinkGeometries(
  selectedCommunityId: number,
  selectedCommunity: CommunityData,
  interCommunityEdges: Map<string, InterCommunityEdge>,
  communities: Map<number, CommunityData>
): Array<{
  targetCid: number;
  count: number;
  geometry: BufferGeometry;
  color: string;
  opacity: number;
}> {
  const [cx, cy, cz] = selectedCommunity.centroid;
  const result: Array<{
    targetCid: number;
    count: number;
    geometry: BufferGeometry;
    color: string;
    opacity: number;
  }> = [];

  for (const edge of interCommunityEdges.values()) {
    let otherCid: number | null = null;
    if (edge.sourceCid === selectedCommunityId) {
      otherCid = edge.targetCid;
    } else if (edge.targetCid === selectedCommunityId) {
      otherCid = edge.sourceCid;
    }
    if (otherCid === null) continue;

    const other = communities.get(otherCid);
    if (!other) continue;

    const [tx, ty, tz] = other.centroid;
    const pos = new Float32Array([cx, cy, cz, tx, ty, tz]);
    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new Float32BufferAttribute(pos, 3));

    result.push({
      targetCid: otherCid,
      count: edge.count,
      geometry,
      color: other.color,
      opacity: Math.min(
        communityLink.opacityMax,
        communityLink.opacityBase + edge.count * communityLink.opacityPerCount
      )
    });
  }

  result.sort((a, b) => b.count - a.count);
  return result;
}

export type CommunitySplit = {
  mainCommunities: CommunityData[];
  otherCluster: {
    centroid: [number, number, number];
    radius: number;
    nodeCount: number;
    communityCount: number;
  } | null;
};

/**
 * Split communities into main (shown individually) and other (clustered)
 * based on clustering thresholds and visible IDs.
 */
export function splitCommunitiesForDisplay(
  communities: Map<number, CommunityData>,
  clusteringEnabled: boolean,
  cameraDistance: number,
  farDistanceThreshold: number,
  smallThreshold: number,
  visibleIds?: Set<number> | null
): CommunitySplit {
  if (!clusteringEnabled || cameraDistance <= farDistanceThreshold) {
    const all = [...communities.values()];
    if (!visibleIds) return { mainCommunities: all, otherCluster: null };
    return {
      mainCommunities: all.filter((c) => visibleIds.has(c.id)),
      otherCluster: null
    };
  }

  // Clustering is active
  const main: CommunityData[] = [];
  const small: CommunityData[] = [];

  for (const c of communities.values()) {
    if (visibleIds && !visibleIds.has(c.id)) continue;
    if (c.nodeCount < smallThreshold) {
      small.push(c);
    } else {
      main.push(c);
    }
  }

  if (small.length === 0) return { mainCommunities: main, otherCluster: null };

  // Compute weighted centroid
  let totalNodes = 0;
  let cx = 0,
    cy = 0,
    cz = 0;
  for (const c of small) {
    const n = c.nodeCount;
    totalNodes += n;
    cx += c.centroid[0] * n;
    cy += c.centroid[1] * n;
    cz += c.centroid[2] * n;
  }
  cx /= totalNodes;
  cy /= totalNodes;
  cz /= totalNodes;

  // Compute radius from collective spread
  let maxDistSq = 0;
  for (const c of small) {
    const dx = c.centroid[0] - cx;
    const dy = c.centroid[1] - cy;
    const dz = c.centroid[2] - cz;
    const dSq = dx * dx + dy * dy + dz * dz;
    if (dSq > maxDistSq) maxDistSq = dSq;
  }
  const radius = Math.max(0.5, Math.sqrt(maxDistSq)) * 0.8;

  return {
    mainCommunities: main,
    otherCluster: {
      centroid: [cx, cy, cz],
      radius,
      nodeCount: totalNodes,
      communityCount: small.length
    }
  };
}
