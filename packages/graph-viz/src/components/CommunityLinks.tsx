import type {} from '@react-three/fiber';
import { useMemo } from 'react';
import { BufferGeometry, Float32BufferAttribute } from 'three';
import { useDataStore } from '../stores/dataStore';

type CommunityLinksProps = {
  selectedCommunityId: number;
};

function CommunityLinks({ selectedCommunityId }: CommunityLinksProps) {
  const communities = useDataStore((s) => s.communities);
  const interCommunityEdges = useDataStore((s) => s.interCommunityEdges);

  const selectedCommunity = communities.get(selectedCommunityId);

  // Build linked communities
  const links = useMemo(() => {
    const result: Array<{
      targetCid: number;
      count: number;
      geometry: BufferGeometry;
      color: string;
      opacity: number;
    }> = [];

    if (!selectedCommunity) return result;

    const [cx, cy, cz] = selectedCommunity.centroid;

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
        opacity: Math.min(0.6, 0.15 + edge.count * 0.02)
      });
    }

    result.sort((a, b) => b.count - a.count);
    return result;
  }, [
    selectedCommunityId,
    communities,
    interCommunityEdges,
    selectedCommunity
  ]);

  return (
    <>
      {links.map((link) => (
        <lineSegments
          key={`cross-${selectedCommunityId}-${link.targetCid}`}
          geometry={link.geometry}
        >
          <lineBasicMaterial
            color={link.color}
            opacity={link.opacity}
            transparent
            depthWrite={false}
          />
        </lineSegments>
      ))}
    </>
  );
}

export { CommunityLinks };
