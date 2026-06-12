import type {} from '@react-three/fiber';
import { useMemo } from 'react';
import { BufferGeometry, Float32BufferAttribute } from 'three';
import { useDataStore } from '../stores/dataStore';
import { hexToRgb } from '../utils/colors';

type CommunityEdgesProps = {
  visibleIds?: Set<number> | null;
};

function CommunityEdges({ visibleIds }: CommunityEdgesProps) {
  const communities = useDataStore((s) => s.communities);
  const interCommunityEdges = useDataStore((s) => s.interCommunityEdges);

  const { geometry, hasEdges } = useMemo(() => {
    const edges = [...interCommunityEdges.values()].filter((e) => {
      if (e.count < 2) return false;
      if (!visibleIds) return true;
      return visibleIds.has(e.sourceCid) && visibleIds.has(e.targetCid);
    });
    if (edges.length === 0) return { geometry: null, hasEdges: false };

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

    return { geometry: geo, hasEdges: true };
  }, [interCommunityEdges, communities, visibleIds]);

  if (!hasEdges || !geometry) return null;

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial
        vertexColors
        transparent
        opacity={0.3}
        depthWrite={false}
      />
    </lineSegments>
  );
}

export { CommunityEdges };
