import { useRef, useEffect } from 'react';
import { Color, Matrix4 } from 'three';
import type { ThreeEvent } from '@react-three/fiber';
import type { InstancedMesh, Vector3, Quaternion } from 'three';

import type { Node3D } from '../types/graph';

type InstancedNodesProps = {
  nodes: Node3D[];
  selectedNode?: string;
  hoveredNode?: string;
  onNodeSelect?: (id: string) => void;
};

function InstancedNodes({
  nodes,
  selectedNode,
  hoveredNode,
  onNodeSelect,
}: InstancedNodesProps) {
  const meshRef = useRef<InstancedMesh>(null);
  const nodeMapRef = useRef(new Map<number, Node3D>());

  // Build node index map
  useEffect(() => {
    nodeMapRef.current.clear();
    nodes.forEach((node, idx) => {
      nodeMapRef.current.set(idx, node);
    });
  }, [nodes]);

  // Update instance transforms
  useEffect(() => {
    if (!meshRef.current) return;

    const matrix = new Matrix4();

    nodes.forEach((node, idx) => {
      const scale =
        node.id === selectedNode ? 1.5 : node.id === hoveredNode ? 1.2 : 1;

      matrix.compose(
        { x: node.x, y: node.y, z: node.z } as Vector3,
        { x: 0, y: 0, z: 0, w: 1 } as Quaternion,
        { x: scale, y: scale, z: scale } as Vector3
      );

      meshRef.current?.setMatrixAt(idx, matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [nodes, selectedNode, hoveredNode]);

  // Update instance colors
  useEffect(() => {
    if (!meshRef.current) return;

    const color = new Color();

    nodes.forEach((node, idx) => {
      if (node.id === selectedNode) {
        color.setHex(0xff6b6b);
      } else if (node.id === hoveredNode) {
        color.setHex(0x4ecdc4);
      } else {
        const hue = (node.community ?? 0) / 20;
        color.setHSL(hue, 0.7, 0.6);
      }

      meshRef.current?.setColorAt(idx, color);
    });

    meshRef.current.instanceColor!.needsUpdate = true;
  }, [nodes, selectedNode, hoveredNode]);

  const handleClick = (event: ThreeEvent<PointerEvent>) => {
    const idx = event.instanceId;
    if (idx !== undefined) {
      const node = nodeMapRef.current.get(idx);
      if (node) {
        onNodeSelect?.(node.id);
      }
    }
  };

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, nodes.length]}
      onClick={handleClick}
    >
      <sphereGeometry args={[2, 16, 16]} />
      <meshStandardMaterial emissiveIntensity={0.3} />
    </instancedMesh>
  );
}

export { InstancedNodes };
