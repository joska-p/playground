import { communityEdge } from '../../../config';
import { useDataStore } from '../../../stores/dataStore';
import { useUiStore } from '../../../stores/uiStore';
import type { InterCommunityEdge } from '../../../types';
import type { Tier } from '../services/communityGeometry';
import { buildCommunityEdgeGeometries } from '../services/communityGeometry';
import { DirectedArrowhead } from './DirectedArrowhead';

type CommunityEdgesProps = {
  visibleIds?: Set<number> | null;
};

function CommunityEdges({ visibleIds }: CommunityEdgesProps) {
  const communities = useDataStore((s) => s.communities);
  const interCommunityEdges = useDataStore((s) => s.interCommunityEdges);
  const hiddenRelationTypes = useUiStore((s) => s.hiddenRelationTypes);

  // Filter inter-community edges by hidden relation types
  const edges = (() => {
    if (hiddenRelationTypes.size === 0) return interCommunityEdges;
    const filtered = new Map<string, InterCommunityEdge>();
    for (const [key, edge] of interCommunityEdges) {
      if (edge.relation && hiddenRelationTypes.has(edge.relation as never))
        continue;
      filtered.set(key, edge);
    }
    return filtered;
  })();

  const { geometries, arrowheads, hasEdges } = buildCommunityEdgeGeometries(
    edges,
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
          <lineSegments
            key={tier}
            geometry={entry.geometry}
          >
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
