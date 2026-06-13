import type {} from '@react-three/fiber';
import { graphEdge } from '../../../config';
import type { GraphLink } from '../../../types';
import { buildEdgeGroups } from '../services/edgeGeometry';

type GraphEdgesProps = {
  positions: Float32Array;
  links: GraphLink[];
  nodeIndex: Map<string, number>;
};

function GraphEdges({ positions, links, nodeIndex }: GraphEdgesProps) {
  // Filter to valid links (simple filter, kept inline)
  const validLinks = links.filter(
    (l) => nodeIndex.has(l.source) && nodeIndex.has(l.target)
  );

  // Delegate edge geometry computation to the service
  const { confidentGeometry, inferredGeometry } = buildEdgeGroups(
    validLinks,
    positions,
    nodeIndex
  );

  return (
    <>
      {confidentGeometry && (
        <lineSegments geometry={confidentGeometry}>
          <lineBasicMaterial
            vertexColors
            transparent
            opacity={graphEdge.opacityByConfidence.CONFIDENT}
            depthWrite={false}
          />
        </lineSegments>
      )}
      {inferredGeometry && (
        <lineSegments geometry={inferredGeometry}>
          <lineBasicMaterial
            vertexColors
            transparent
            opacity={graphEdge.opacityByConfidence.INFERRED}
            depthWrite={false}
          />
        </lineSegments>
      )}
    </>
  );
}

export { GraphEdges };
