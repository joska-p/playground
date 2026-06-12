import { BufferGeometry, Float32BufferAttribute } from 'three';
import type { ThreeEvent } from '@react-three/fiber';
import type { GraphNode } from '../types';
import { communityColor, hexToRgb } from '../utils/colors';

type GraphNodesProps = {
  positions: Float32Array;
  nodes: GraphNode[];
  size?: number;
  opacity?: number;
  onNodeClick?: (node: GraphNode) => void;
};

function GraphNodes({ positions, nodes, size = 6, opacity = 0.9, onNodeClick }: GraphNodesProps) {
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

  function handleClick(e: ThreeEvent<PointerEvent>) {
    if (e.index !== undefined && onNodeClick) {
      onNodeClick(nodes[e.index]!);
    }
  }

  return (
    <points geometry={geometry} onClick={handleClick}>
      <pointsMaterial
        size={size}
        vertexColors
        sizeAttenuation
        depthWrite={false}
        transparent
        opacity={opacity}
      />
    </points>
  );
}

export { GraphNodes };
