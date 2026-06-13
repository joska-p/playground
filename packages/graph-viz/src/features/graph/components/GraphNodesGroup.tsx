import type { ThreeEvent } from '@react-three/fiber';
import { useRef } from 'react';
import type { InstancedMesh } from 'three';
import { SphereGeometry, TorusGeometry } from 'three';
import { degree, nodes as nodeConfig, torusRing } from '../../../config';
import { useUiStore } from '../../../stores/uiStore';
import type { GraphNode } from '../../../types';
import { communityColor, hexToRgb } from '../../../utils/colors';
import { degreeToBrightness, degreeToSize } from '../../../utils/nodes';
import { useCompanionMesh, useInstanceMesh } from '../hooks/useInstanceMesh';

const sphereGeometry = new SphereGeometry(
  nodeConfig.geometryRadius,
  nodeConfig.geometryWidthSegments,
  nodeConfig.geometryHeightSegments
);

const torusGeometry = new TorusGeometry(
  torusRing.radius,
  torusRing.tube,
  torusRing.radialSegments,
  torusRing.tubularSegments
);

type GraphNodesGroupProps = {
  indices: number[];
  opacity: number;
  ringColor?: string | null;
  highlightIndices?: Set<number>;
  positions: Float32Array;
  nodes: GraphNode[];
  degrees: Float32Array | null;
  maxDegree: number;
  size: number;
  onNodeClick?: (node: GraphNode) => void;
  onPointerMoveNode?: (nodeIndex: number | null) => void;
};

function GraphNodesGroup({
  indices,
  opacity,
  ringColor,
  highlightIndices,
  positions,
  nodes,
  degrees,
  maxDegree,
  size,
  onNodeClick,
  onPointerMoveNode
}: GraphNodesGroupProps) {
  const meshRef = useRef<InstancedMesh>(null);
  const ringRef = useRef<InstancedMesh>(null);
  const setPointerPosition = useUiStore((s) => s.setPointerPosition);
  const count = indices.length;

  // Build instance values for the main sphere mesh
  // baseScale is used by useInstanceMesh to scale each instance's value
  const baseScale = size / nodeConfig.defaultSizeBase;

  const scaleValues: number[] = [];
  const colorValues: string[] = [];
  for (let i = 0; i < count; i++) {
    const idx = indices[i]!;
    const deg = degrees?.[idx] ?? 0;
    scaleValues.push(degreeToSize(deg, maxDegree, degree.sizeMin, degree.sizeMax));

    const isHighlighted = highlightIndices?.has(idx) ?? false;
    const brightness = isHighlighted
      ? 1
      : degreeToBrightness(deg, maxDegree, degree.brightnessMin);
    const baseHex = communityColor(nodes[idx]!.community);
    const [r, g, b] = hexToRgb(baseHex);
    const toHex = (v: number) => Math.round(v * brightness * 255).toString(16).padStart(2, '0');
    colorValues.push(`#${toHex(r)}${toHex(g)}${toHex(b)}`);
  }

  useInstanceMesh(meshRef, {
    positions,
    indices,
    scaleValues,
    colorValues,
    baseScale,
  });

  // Companion ring mesh (only updates when ringColor is present)
  useCompanionMesh(ringRef, positions, indices, [ringColor]);

  function handleClick(e: ThreeEvent<PointerEvent>) {
    if (e.instanceId !== undefined && onNodeClick) {
      onNodeClick(nodes[indices[e.instanceId]!]!);
    }
  }

  function handlePointerMove(e: ThreeEvent<PointerEvent>) {
    document.body.style.cursor = 'pointer';
    setPointerPosition(e.clientX, e.clientY);
    if (onPointerMoveNode) {
      onPointerMoveNode(e.instanceId !== undefined ? indices[e.instanceId]! : null);
    }
  }

  function handlePointerOut() {
    document.body.style.cursor = 'auto';
    if (onPointerMoveNode) {
      onPointerMoveNode(null);
    }
  }

  if (count === 0) return null;

  return (
    <group>
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
          transparent={opacity < 1}
          opacity={opacity}
        />
      </instancedMesh>
      {ringColor && (
        <instancedMesh
          ref={ringRef}
          args={[torusGeometry, undefined, count]}
          frustumCulled={false}
        >
          <meshBasicMaterial
            color={ringColor}
            transparent
            opacity={0.8}
            depthWrite={false}
          />
        </instancedMesh>
      )}
    </group>
  );
}

export { GraphNodesGroup };
