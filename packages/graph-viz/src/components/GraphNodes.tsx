import { BufferGeometry, Float32BufferAttribute } from 'three';
import type {} from '@react-three/fiber';
import type { GraphNode } from '../types';
import { communityColor, hexToRgb } from '../utils/colors';

type GraphNodesProps = {
  positions: Float32Array;
  nodes: GraphNode[];
};

function GraphNodes({ positions, nodes }: GraphNodesProps) {
  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));

  const colors = new Float32Array(nodes.length * 3);
  for (let i = 0; i < nodes.length; i++) {
    const rgb = hexToRgb(communityColor(nodes[i]!.community));
    colors[i * 3] = rgb[0];
    colors[i * 3 + 1] = rgb[1];
    colors[i * 3 + 2] = rgb[2];
  }
  geometry.setAttribute('color', new Float32BufferAttribute(colors, 3));

  return (
    <points geometry={geometry}>
      <pointsMaterial
        size={6}
        vertexColors
        sizeAttenuation
        depthWrite={false}
        transparent
        opacity={0.9}
      />
    </points>
  );
}

export { GraphNodes };
