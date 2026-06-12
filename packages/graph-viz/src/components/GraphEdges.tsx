import type {} from '@react-three/fiber';
import { BufferGeometry, Float32BufferAttribute } from 'three';
import { graphEdge, relationPalette } from '../config';
import type { GraphLink } from '../types';
import { hexToRgb } from '../utils/colors';

type GraphEdgesProps = {
  positions: Float32Array;
  links: GraphLink[];
  nodeIndex: Map<string, number>;
};

const FALLBACK_COLOR = '#888888';

/**
 * Build a BufferGeometry + color attribute for a set of links.
 * Splits links into confident and inferred groups.
 */
function buildEdgeGroups(
  links: GraphLink[],
  positions: Float32Array,
  nodeIndex: Map<string, number>
) {
  const confident: GraphLink[] = [];
  const inferred: GraphLink[] = [];

  for (const link of links) {
    if (link.confidence === 'INFERRED') {
      inferred.push(link);
    } else {
      confident.push(link);
    }
  }

  function buildGeometry(group: GraphLink[]) {
    const verts = new Float32Array(group.length * 6);
    const colors = new Float32Array(group.length * 6);

    for (let i = 0; i < group.length; i++) {
      const si = nodeIndex.get(group[i]!.source)!;
      const ti = nodeIndex.get(group[i]!.target)!;
      verts[i * 6] = positions[si * 3]!;
      verts[i * 6 + 1] = positions[si * 3 + 1]!;
      verts[i * 6 + 2] = positions[si * 3 + 2]!;
      verts[i * 6 + 3] = positions[ti * 3]!;
      verts[i * 6 + 4] = positions[ti * 3 + 1]!;
      verts[i * 6 + 5] = positions[ti * 3 + 2]!;

      const relation = group[i]!.relation;
      const hex = relationPalette[relation] ?? FALLBACK_COLOR;
      const rgb = hexToRgb(hex);
      // Same color for both vertices of this edge
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
  }

  return {
    confidentGeometry: confident.length > 0 ? buildGeometry(confident) : null,
    inferredGeometry: inferred.length > 0 ? buildGeometry(inferred) : null
  };
}

function GraphEdges({ positions, links, nodeIndex }: GraphEdgesProps) {
  const validLinks = links.filter(
    (l) => nodeIndex.has(l.source) && nodeIndex.has(l.target)
  );

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
