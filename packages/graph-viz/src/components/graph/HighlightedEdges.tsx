import { BufferGeometry, Float32BufferAttribute } from 'three';
import { highlightedEdge, relationPalette } from '../../config';
import type { GraphLink } from '../../types';
import { hexToRgb } from '../../utils/colors';

type HighlightedEdgesProps = {
  positions: Float32Array;
  links: GraphLink[];
  nodeIndex: Map<string, number>;
  selectedNodeId: string;
};

const FALLBACK_COLOR = '#ffffff';

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
  const connectedEdges = (() => {
    return links.filter(
      (l) => l.source === selectedNodeId || l.target === selectedNodeId
    );
  })();

  const geometry = (() => {
    const verts = new Float32Array(connectedEdges.length * 6);
    const colors = new Float32Array(connectedEdges.length * 6);

    for (let i = 0; i < connectedEdges.length; i++) {
      const si = nodeIndex.get(connectedEdges[i]!.source)!;
      const ti = nodeIndex.get(connectedEdges[i]!.target)!;
      verts[i * 6] = positions[si * 3]!;
      verts[i * 6 + 1] = positions[si * 3 + 1]!;
      verts[i * 6 + 2] = positions[si * 3 + 2]!;
      verts[i * 6 + 3] = positions[ti * 3]!;
      verts[i * 6 + 4] = positions[ti * 3 + 1]!;
      verts[i * 6 + 5] = positions[ti * 3 + 2]!;

      const relation = connectedEdges[i]!.relation;
      const hex = highlightedEdge.useRelationColor
        ? (relationPalette[relation] ?? FALLBACK_COLOR)
        : FALLBACK_COLOR;
      const rgb = hexToRgb(hex);
      colors[i * 6] = rgb[0];
      colors[i * 6 + 1] = rgb[1];
      colors[i * 6 + 2] = rgb[2];
      colors[i * 6 + 3] = rgb[0];
      colors[i * 6 + 4] = rgb[1];
      colors[i * 6 + 5] = rgb[2];
    }

    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new Float32BufferAttribute(verts, 3));
    geometry.setAttribute('color', new Float32BufferAttribute(colors, 3));
    return geometry;
  })();

  if (connectedEdges.length === 0) return null;

  return (
    <lineSegments geometry={geometry}>
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
