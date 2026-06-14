import type {} from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import type { BufferGeometry } from 'three';
import { graphEdge } from '../../../config';
import { useUiStore } from '../../../stores/uiStore';
import type { GraphLink } from '../../../types';
import { buildEdgeGroups } from '../services/edgeGeometry';

type GraphEdgesProps = {
  positions: Float32Array;
  links: GraphLink[];
  nodeIndex: Map<string, number>;
};

function GraphEdges({ positions, links, nodeIndex }: GraphEdgesProps) {
  const hiddenRelationTypes = useUiStore((s) => s.hiddenRelationTypes);

  const confidentRef = useRef<BufferGeometry | null>(null);
  const inferredRef = useRef<BufferGeometry | null>(null);

  // Filter to valid links, then apply relation-type filter
  const validLinks = links.filter((l) => {
    if (!nodeIndex.has(l.source) || !nodeIndex.has(l.target)) return false;
    if (
      hiddenRelationTypes.size > 0 &&
      hiddenRelationTypes.has(l.relation as never)
    )
      return false;
    return true;
  });

  // Delegate edge geometry computation to the service
  const { confidentGeometry, inferredGeometry } = buildEdgeGroups(
    validLinks,
    positions,
    nodeIndex
  );

  // Dispose previous geometries before replacing them
  useEffect(() => {
    confidentRef.current = confidentGeometry;
    inferredRef.current = inferredGeometry;
    return () => {
      confidentGeometry?.dispose();
      inferredGeometry?.dispose();
    };
  }, [confidentGeometry, inferredGeometry]);

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
