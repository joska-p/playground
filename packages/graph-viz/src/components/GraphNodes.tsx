import type { ThreeEvent } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import type { InstancedMesh } from 'three';
import { Color, MeshBasicMaterial, Object3D, SphereGeometry } from 'three';
import type { GraphNode } from '../types';
import { communityColor, hexToRgb } from '../utils/colors';
import { degreeToBrightness, degreeToSize } from '../utils/nodes';

const sphereGeometry = new SphereGeometry(0.5, 12, 8);
const baseMaterial = new MeshBasicMaterial();

type GraphNodesProps = {
  positions: Float32Array;
  nodes: GraphNode[];
  degrees?: Float32Array | null;
  size?: number;
  opacity?: number;
  highlightIndices?: Set<number>;
  onNodeClick?: (node: GraphNode) => void;
  onPointerMoveNode?: (nodeIndex: number | null) => void;
};

function GraphNodes({
  positions,
  nodes,
  degrees = null,
  size = 6,
  opacity = 1,
  highlightIndices,
  onNodeClick,
  onPointerMoveNode
}: GraphNodesProps) {
  const meshRef = useRef<InstancedMesh>(null);
  const count = nodes.length;

  // Apply opacity to the shared material
  useEffect(() => {
    baseMaterial.transparent = opacity < 1;
    baseMaterial.opacity = opacity;
    baseMaterial.depthWrite = opacity >= 1;
    baseMaterial.needsUpdate = true;
  }, [opacity]);

  // Find max degree for normalization
  let maxDegree = 0;
  if (degrees) {
    for (let i = 0; i < degrees.length; i++) {
      if (degrees[i]! > maxDegree) maxDegree = degrees[i]!;
    }
  }

  useEffect(() => {
    if (!meshRef.current) return;
    const dummy = new Object3D();
    const color = new Color();
    const baseScale = size / 6;

    for (let i = 0; i < count; i++) {
      const px = positions[i * 3]!;
      const py = positions[i * 3 + 1]!;
      const pz = positions[i * 3 + 2]!;

      const deg = degrees?.[i] ?? 0;
      const s = degreeToSize(deg, maxDegree, 0.3, 1.8) * baseScale;
      const isHighlighted = highlightIndices?.has(i) ?? false;
      const brightness = isHighlighted ? 1 : degreeToBrightness(deg, maxDegree);

      dummy.position.set(px, py, pz);
      dummy.scale.set(s, s, s);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);

      const rgb = hexToRgb(communityColor(nodes[i]!.community));
      color.setRGB(
        rgb[0] * brightness,
        rgb[1] * brightness,
        rgb[2] * brightness
      );
      meshRef.current.setColorAt(i, color);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  }, [positions, nodes, degrees, maxDegree, size, count, highlightIndices]);

  function handleClick(e: ThreeEvent<PointerEvent>) {
    if (e.instanceId !== undefined && onNodeClick) {
      onNodeClick(nodes[e.instanceId]!);
    }
  }

  function handlePointerMove(e: ThreeEvent<PointerEvent>) {
    if (onPointerMoveNode) {
      onPointerMoveNode(e.instanceId ?? null);
    }
  }

  function handlePointerOut() {
    if (onPointerMoveNode) {
      onPointerMoveNode(null);
    }
  }

  return (
    <instancedMesh
      ref={meshRef}
      args={[sphereGeometry, baseMaterial, count]}
      onClick={handleClick}
      onPointerMove={handlePointerMove}
      onPointerOut={handlePointerOut}
      frustumCulled={false}
    />
  );
}

export { GraphNodes };
