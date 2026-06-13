import { communityEdge } from '../../../config';
import { useDataStore } from '../../../stores/dataStore';
import type { Tier } from '../services/communityGeometry';
import { buildCommunityEdgeGeometries } from '../services/communityGeometry';
import { DirectedArrowhead } from './DirectedArrowhead';

type CommunityEdgesProps = {
  visibleIds?: Set<number> | null;
};

function CommunityEdges({ visibleIds }: CommunityEdgesProps) {
  const communities = useDataStore((s) => s.communities);
  const interCommunityEdges = useDataStore((s) => s.interCommunityEdges);

  const { geometries, arrowheads, hasEdges } = buildCommunityEdgeGeometries(
    interCommunityEdges,
    communities,
    visibleIds,
    communityEdge.minCount,
    communityEdge.coupling.tierThresholds
  );

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
