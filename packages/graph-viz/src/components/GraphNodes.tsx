import type { ThreeEvent } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import type { InstancedMesh } from 'three';
import { Color, Object3D, SphereGeometry, TorusGeometry } from 'three';
import { degree, nodes as nodeConfig, nodeHealth, torusRing } from '../config';
import { useDataStore } from '../stores/dataStore';
import { useUiStore } from '../stores/uiStore';
import type { GraphLink, GraphNode } from '../types';
import { communityColor, hexToRgb } from '../utils/colors';
import { classifyNodeHealth, degreeToBrightness, degreeToSize } from '../utils/nodes';
import type { NodeHealth } from '../utils/nodes';

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

  useEffect(() => {
    if (!meshRef.current) return;
    const dummy = new Object3D();
    const color = new Color();
    const baseScale = size / nodeConfig.defaultSizeBase;

    for (let i = 0; i < count; i++) {
      const idx = indices[i]!;
      const px = positions[idx * 3]!;
      const py = positions[idx * 3 + 1]!;
      const pz = positions[idx * 3 + 2]!;

      const deg = degrees?.[idx] ?? 0;
      const s =
        degreeToSize(deg, maxDegree, degree.sizeMin, degree.sizeMax) *
        baseScale;
      const isHighlighted = highlightIndices?.has(idx) ?? false;
      const brightness = isHighlighted
        ? 1
        : degreeToBrightness(deg, maxDegree, degree.brightnessMin);

      dummy.position.set(px, py, pz);
      dummy.scale.set(s, s, s);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);

      const rgb = hexToRgb(communityColor(nodes[idx]!.community));
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

    // Compute bounding sphere from actual instance positions
    // so Three.js frustum culling correctly culls the mesh
    // when the entire graph is outside the view frustum
    meshRef.current.computeBoundingSphere();

    // Update ring positions if ringColor is set
    if (ringColor && ringRef.current) {
      for (let i = 0; i < count; i++) {
        const idx = indices[i]!;
        const px = positions[idx * 3]!;
        const py = positions[idx * 3 + 1]!;
        const pz = positions[idx * 3 + 2]!;
        dummy.position.set(px, py, pz);
        dummy.scale.set(1, 1, 1);
        dummy.updateMatrix();
        ringRef.current.setMatrixAt(i, dummy.matrix);
      }
      ringRef.current.instanceMatrix.needsUpdate = true;
      ringRef.current.computeBoundingSphere();
    }
  }, [indices, positions, nodes, degrees, maxDegree, size, count, highlightIndices, ringColor]);

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

type GraphNodesProps = {
  positions: Float32Array;
  nodes: GraphNode[];
  degrees?: Float32Array | null;
  size?: number;
  highlightIndices?: Set<number>;
  links?: GraphLink[];
  onNodeClick?: (node: GraphNode) => void;
  onPointerMoveNode?: (nodeIndex: number | null) => void;
};

function GraphNodes({
  positions,
  nodes,
  degrees = null,
  size = nodeConfig.defaultSize,
  highlightIndices,
  links: linksProp,
  onNodeClick,
  onPointerMoveNode
}: GraphNodesProps) {
  // Find max degree for normalization
  let maxDegree = 0;
  if (degrees) {
    for (let i = 0; i < degrees.length; i++) {
      if (degrees[i]! > maxDegree) maxDegree = degrees[i]!;
    }
  }

  const rawLinks = useDataStore((s) => s.graphData?.links ?? []);
  const allLinks = linksProp ?? rawLinks;
  const nodeIndex = useDataStore((s) => s.nodeIndex);

  const healthGroups = (() => {
    const groups: Record<NodeHealth, number[]> = {
      active: [],
      'low-confidence': [],
      isolated: []
    };
    for (let i = 0; i < nodes.length; i++) {
      const health = classifyNodeHealth(
        nodes[i]!.id,
        allLinks,
        degrees,
        nodeIndex,
        i
      );
      groups[health].push(i);
    }
    return groups;
  })();

  return (
    <>
      <GraphNodesGroup
        indices={healthGroups.active}
        opacity={1}
        positions={positions}
        nodes={nodes}
        degrees={degrees}
        maxDegree={maxDegree}
        size={size}
        highlightIndices={highlightIndices}
        onNodeClick={onNodeClick}
        onPointerMoveNode={onPointerMoveNode}
      />
      <GraphNodesGroup
        indices={healthGroups['low-confidence']}
        opacity={nodeHealth.lowConfidence.opacity}
        ringColor={nodeHealth.lowConfidence.ringColor}
        positions={positions}
        nodes={nodes}
        degrees={degrees}
        maxDegree={maxDegree}
        size={size}
        highlightIndices={highlightIndices}
        onNodeClick={onNodeClick}
        onPointerMoveNode={onPointerMoveNode}
      />
      <GraphNodesGroup
        indices={healthGroups.isolated}
        opacity={nodeHealth.isolated.opacity}
        ringColor={nodeHealth.isolated.ringColor}
        positions={positions}
        nodes={nodes}
        degrees={degrees}
        maxDegree={maxDegree}
        size={size}
        highlightIndices={highlightIndices}
        onNodeClick={onNodeClick}
        onPointerMoveNode={onPointerMoveNode}
      />
    </>
  );
}

export { GraphNodes, GraphNodesGroup };
