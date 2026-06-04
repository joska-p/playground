import {
  OrbitControls,
  PerspectiveCamera,
} from '@react-three/drei';
import { useEffect, useMemo, useRef } from 'react';
import { Group } from 'three';

import type { GraphLayout, Node3D } from '../types/graph';
import { Link } from './Link';
import { Node } from './Node';

interface Scene3DProps {
  layout: GraphLayout;
  selectedNode?: string;
  hoveredNode?: string;
  onNodeHover?: (id: string | undefined) => void;
  onNodeSelect?: (id: string) => void;
}

function Scene3D({
  layout,
  selectedNode,
  hoveredNode,
  onNodeHover,
  onNodeSelect,
}: Scene3DProps) {
  const nodeMapRef = useRef(new Map<string, Node3D>());
  const groupRef = useRef<Group>(null);

  // Update node map
  useEffect(() => {
    nodeMapRef.current.clear();
    layout.nodes.forEach((node) => {
      nodeMapRef.current.set(node.id, node);
    });
  }, [layout.nodes]);

  // Calculate bounds
  const bounds = useMemo(() => {
    if (layout.nodes.length === 0) {
      return { min: [-50, -50, -50], max: [50, 50, 50], center: [0, 0, 0] };
    }

    const positions = layout.nodes.map((n) => [n.x, n.y, n.z]);
    const xs = positions.map((p) => p[0]);
    const ys = positions.map((p) => p[1]);
    const zs = positions.map((p) => p[2]);

    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);
    const minZ = Math.min(...zs);
    const maxZ = Math.max(...zs);

    const centerX = (minX + maxX) / 2;
    const centerY = (minY + maxY) / 2;
    const centerZ = (minZ + maxZ) / 2;

    return {
      min: [minX, minY, minZ],
      max: [maxX, maxY, maxZ],
      center: [centerX, centerY, centerZ],
    };
  }, [layout.nodes]);

  return (
    <>
      <PerspectiveCamera
        makeDefault
        position={[
          bounds.center[0] + 100,
          bounds.center[1] + 100,
          bounds.center[2] + 100,
        ]}
        fov={50}
      />

      <OrbitControls
        enableDamping
        dampingFactor={0.05}
        target={bounds.center as [number, number, number]}
      />

      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[100, 100, 100]} intensity={0.8} castShadow />
      <pointLight position={[-100, -100, -100]} intensity={0.4} />

      {/* Graph visualization */}
      <group ref={groupRef}>
        {/* Render links first (behind nodes) */}
        {layout.links.map((link, idx) => (
          <Link key={`link-${idx}`} link={link} nodeMap={nodeMapRef.current} />
        ))}

        {/* Render nodes */}
        {layout.nodes.map((node) => (
          <Node
            key={node.id}
            node={node}
            selected={node.id === selectedNode}
            hovered={node.id === hoveredNode}
            onHover={onNodeHover}
            onClick={onNodeSelect}
          />
        ))}
      </group>
    </>
  );
}

export { Scene3D };
