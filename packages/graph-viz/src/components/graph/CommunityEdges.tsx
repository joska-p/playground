import { BufferGeometry, Float32BufferAttribute } from 'three';
import { communityEdge, directedEdge } from '../../config';
import { useDataStore } from '../../stores/dataStore';
import type { InterCommunityEdge } from '../../types';
import { hexToRgb } from '../../utils/colors';
import { DirectedArrowhead } from './DirectedArrowhead';

type CommunityEdgesProps = {
  visibleIds?: Set<number> | null;
};

type Tier = 0 | 1 | 2;

const TIER_OPACITIES: Record<Tier, number> = { 0: 0.1, 1: 0.4, 2: 0.8 };

function CommunityEdges({ visibleIds }: CommunityEdgesProps) {
  const communities = useDataStore((s) => s.communities);
  const interCommunityEdges = useDataStore((s) => s.interCommunityEdges);

  const { geometries, arrowheads, hasEdges } = (() => {
    const allEdges = [...interCommunityEdges.values()].filter((e) => {
      if (e.count < communityEdge.minCount) return false;
      if (!visibleIds) return true;
      return visibleIds.has(e.sourceCid) && visibleIds.has(e.targetCid);
    });
    if (allEdges.length === 0)
      return { geometries: null, arrowheads: [] as Array<{ from: [number, number, number]; to: [number, number, number]; color: string }>, hasEdges: false };

    const [, lowThreshold, highThreshold] = communityEdge.coupling.tierThresholds;

    // 3.1: Group edges by coupling tier
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
    const geometries: Record<Tier, { geometry: BufferGeometry; opacity: number } | null> = {
      0: null,
      1: null,
      2: null,
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

    // 3.5: Build directional arrowheads
    const arrowheads: Array<{
      from: [number, number, number];
      to: [number, number, number];
      color: string;
    }> = [];

    for (const e of allEdges) {
      const total = e.sourceToTargetCount + e.targetToSourceCount;
      if (total === 0) continue;

      const ratio = Math.max(e.sourceToTargetCount, e.targetToSourceCount) / total;
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
  })();

  if (!hasEdges) return null;

  return (
    <>
      {([0, 1, 2] as Tier[]).map((tier) => {
        const entry = geometries?.[tier];
        if (!entry) return null;
        return (
          <lineSegments key={tier} geometry={entry.geometry}>
            <lineBasicMaterial
              vertexColors
              transparent
              opacity={entry.opacity}
              depthWrite={false}
            />
          </lineSegments>
        );
      })}
      {arrowheads.map((ah, i) => (
        <DirectedArrowhead
          key={i}
          from={ah.from}
          to={ah.to}
          color={ah.color}
        />
      ))}
    </>
  );
}

export { CommunityEdges };
