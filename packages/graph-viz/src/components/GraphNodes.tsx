import type { ThreeEvent } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import type { InstancedMesh } from 'three';
import { Color, Object3D, SphereGeometry } from 'three';
import { degree, nodes as nodeConfig } from '../config';
import { useUiStore } from '../stores/uiStore';
import type { GraphNode } from '../types';
import { communityColor, hexToRgb } from '../utils/colors';
import { degreeToBrightness, degreeToSize } from '../utils/nodes';

const sphereGeometry = new SphereGeometry(
  nodeConfig.geometryRadius,
  nodeConfig.geometryWidthSegments,
  nodeConfig.geometryHeightSegments
);

type GraphNodesProps = {
  positions: Float32Array;
  nodes: GraphNode[];
  degrees?: Float32Array | null;
  size?: number;
  highlightIndices?: Set<number>;
  onNodeClick?: (node: GraphNode) => void;
  onPointerMoveNode?: (nodeIndex: number | null) => void;
};

function GraphNodes({
  positions,
  nodes,
  degrees = null,
  size = nodeConfig.defaultSize,
  highlightIndices,
  onNodeClick,
  onPointerMoveNode
}: GraphNodesProps) {
  const meshRef = useRef<InstancedMesh>(null);
  const setPointerPosition = useUiStore((s) => s.setPointerPosition);
  const count = nodes.length;

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
    const baseScale = size / nodeConfig.defaultSizeBase;

    for (let i = 0; i < count; i++) {
      const px = positions[i * 3]!;
      const py = positions[i * 3 + 1]!;
      const pz = positions[i * 3 + 2]!;

      const deg = degrees?.[i] ?? 0;
      const s =
        degreeToSize(deg, maxDegree, degree.sizeMin, degree.sizeMax) *
        baseScale;
      const isHighlighted = highlightIndices?.has(i) ?? false;
      const brightness = isHighlighted
        ? 1
        : degreeToBrightness(deg, maxDegree, degree.brightnessMin);

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
    document.body.style.cursor = 'pointer';
    setPointerPosition(e.clientX, e.clientY);
    if (onPointerMoveNode) {
      onPointerMoveNode(e.instanceId ?? null);
    }
  }

  function handlePointerOut() {
    document.body.style.cursor = 'auto';
    if (onPointerMoveNode) {
      onPointerMoveNode(null);
    }
  }

  return (
    <instancedMesh
      ref={meshRef}
      args={[sphereGeometry, undefined, count]}
      onClick={handleClick}
      onPointerMove={handlePointerMove}
      onPointerOut={handlePointerOut}
      frustumCulled={false}
    >
      <meshStandardMaterial
        roughness={nodeConfig.roughness}
        metalness={nodeConfig.metalness}
      />
    </instancedMesh>
  );
}

export { GraphNodes };
