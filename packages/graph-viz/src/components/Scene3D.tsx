import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import type { Group } from 'three';
import type { GraphLayout, Node3D } from '../types/graph';
import { OptimizedLinks } from './OptimizedLinks';
import { Node } from './Node';

type Scene3DProps = {
  layout: GraphLayout;
  selectedNode?: string;
  hoveredNode?: string;
  onNodeHover?: (id: string | undefined) => void;
  onNodeSelect?: (id: string) => void;
  showLinks: boolean;
};

function Scene3D({
  layout,
  selectedNode,
  hoveredNode,
  onNodeHover,
  onNodeSelect,
  showLinks,
}: Scene3DProps) {
  const groupRef = useRef<Group>(null);

  // Derived map — reactive, no ref needed
  const nodeMap = useMemo(() => {
    const map = new Map<string, Node3D>();
    layout.nodes.forEach((node) => map.set(node.id, node));
    return map;
  }, [layout.nodes]);

  // Calculate bounds
  const bounds = useMemo(() => {
    if (layout.nodes.length === 0) {
      return { min: [-50, -50, -50], max: [50, 50, 50], center: [0, 0, 0] };
    }
    const xs = layout.nodes.map((n) => n.x);
    const ys = layout.nodes.map((n) => n.y);
    const zs = layout.nodes.map((n) => n.z);
    const minX = Math.min(...xs),
      maxX = Math.max(...xs);
    const minY = Math.min(...ys),
      maxY = Math.max(...ys);
    const minZ = Math.min(...zs),
      maxZ = Math.max(...zs);
    return {
      min: [minX, minY, minZ],
      max: [maxX, maxY, maxZ],
      center: [(minX + maxX) / 2, (minY + maxY) / 2, (minZ + maxZ) / 2],
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
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[100, 100, 100]}
        intensity={0.8}
        castShadow
      />
      <pointLight
        position={[-100, -100, -100]}
        intensity={0.4}
      />
      <group ref={groupRef}>
        {nodeMap.size > 0 && (
          <OptimizedLinks
            links={layout.links}
            nodeMap={nodeMap}
            selectedNode={selectedNode}
            showLinks={showLinks}
          />
        )}
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
