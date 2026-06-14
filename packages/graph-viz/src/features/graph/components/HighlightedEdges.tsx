import { useEffect } from 'react';
import { highlightedEdge } from '../../../config';
import type { GraphLink } from '../../../types';
import { buildHighlightedEdgeGeometry } from '../services/edgeGeometry';

type HighlightedEdgesProps = {
  positions: Float32Array;
  links: GraphLink[];
  nodeIndex: Map<string, number>;
  selectedNodeId: string;
};

/**
 * Renders edges connected to the selected node with relation-colored lines
 * so they stand out from the rest of the graph.
 */
function HighlightedEdges({
  positions,
  links,
  nodeIndex,
  selectedNodeId
}: HighlightedEdgesProps) {
  const { geometry, count } = buildHighlightedEdgeGeometry(
    links,
    positions,
    nodeIndex,
    selectedNodeId
  );

  useEffect(() => {
    return () => {
      geometry?.dispose();
    };
  }, [geometry]);

  if (count === 0) return null;

  return (
    <lineSegments geometry={geometry!}>
      <lineBasicMaterial
        vertexColors
        transparent
        opacity={highlightedEdge.opacity}
        depthWrite={false}
      />
    </lineSegments>
  );
}

export { HighlightedEdges };
