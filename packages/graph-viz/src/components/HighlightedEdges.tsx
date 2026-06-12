import { BufferGeometry, Float32BufferAttribute } from 'three';
import { highlightedEdge } from '../config';
import type { GraphLink } from '../types';

type HighlightedEdgesProps = {
  positions: Float32Array;
  links: GraphLink[];
  nodeIndex: Map<string, number>;
  selectedNodeId: string;
};

/**
 * Renders edges connected to the selected node with a bright color
 * so they stand out from the rest of the graph.
 */
function HighlightedEdges({
  positions,
  links,
  nodeIndex,
  selectedNodeId
}: HighlightedEdgesProps) {
  const connectedEdges = (() => {
    return links.filter(
      (l) => l.source === selectedNodeId || l.target === selectedNodeId
    );
  })();

  const geometry = (() => {
    const verts = new Float32Array(connectedEdges.length * 6);
    for (let i = 0; i < connectedEdges.length; i++) {
      const si = nodeIndex.get(connectedEdges[i]!.source)!;
      const ti = nodeIndex.get(connectedEdges[i]!.target)!;
      verts[i * 6] = positions[si * 3]!;
      verts[i * 6 + 1] = positions[si * 3 + 1]!;
      verts[i * 6 + 2] = positions[si * 3 + 2]!;
      verts[i * 6 + 3] = positions[ti * 3]!;
      verts[i * 6 + 4] = positions[ti * 3 + 1]!;
      verts[i * 6 + 5] = positions[ti * 3 + 2]!;
    }

    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new Float32BufferAttribute(verts, 3));
    return geometry;
  })();

  if (connectedEdges.length === 0) return null;

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial
        color={highlightedEdge.color}
        opacity={highlightedEdge.opacity}
        transparent
        depthWrite={false}
      />
    </lineSegments>
  );
}

export { HighlightedEdges };
