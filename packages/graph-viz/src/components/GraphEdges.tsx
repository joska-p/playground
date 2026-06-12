import type {} from '@react-three/fiber';
import { BufferGeometry, Float32BufferAttribute } from 'three';
import { graphEdge } from '../config';
import type { GraphLink } from '../types';

type GraphEdgesProps = {
  positions: Float32Array;
  links: GraphLink[];
  nodeIndex: Map<string, number>;
};

function GraphEdges({ positions, links, nodeIndex }: GraphEdgesProps) {
  const validLinks = links.filter(
    (l) => nodeIndex.has(l.source) && nodeIndex.has(l.target)
  );

  const verts = new Float32Array(validLinks.length * 6);
  for (let i = 0; i < validLinks.length; i++) {
    const si = nodeIndex.get(validLinks[i]!.source)!;
    const ti = nodeIndex.get(validLinks[i]!.target)!;
    verts[i * 6] = positions[si * 3]!;
    verts[i * 6 + 1] = positions[si * 3 + 1]!;
    verts[i * 6 + 2] = positions[si * 3 + 2]!;
    verts[i * 6 + 3] = positions[ti * 3]!;
    verts[i * 6 + 4] = positions[ti * 3 + 1]!;
    verts[i * 6 + 5] = positions[ti * 3 + 2]!;
  }

  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new Float32BufferAttribute(verts, 3));

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial
        color={graphEdge.color}
        opacity={graphEdge.opacity}
        transparent
        depthWrite={false}
      />
    </lineSegments>
  );
}

export { GraphEdges };
