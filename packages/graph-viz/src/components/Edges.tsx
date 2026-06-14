import { useRef, useEffect, type FC } from 'react';
import * as THREE from 'three';
import type { GraphNode, GraphLink } from './useGraphData.ts';
import { useGraphStore } from '../store/graphStore.ts';

interface EdgesProps {
  nodes: GraphNode[];
  links: GraphLink[];
}

const Edges: FC<EdgesProps> = ({ nodes, links }) => {
  const ref = useRef<THREE.LineSegments>(null);

  const edgesVisible = useGraphStore((s) => s.edgesVisible);
  const visibleCommunities = useGraphStore((s) => s.visibleCommunities);
  const selectedNodeIdx = useGraphStore((s) => s.selectedNodeIdx);

  useEffect(() => {
    const lineSegments = ref.current;
    if (!lineSegments) return;

    if (!edgesVisible) {
      // Hide all edges by setting an empty geometry
      lineSegments.geometry.dispose();
      lineSegments.geometry = new THREE.BufferGeometry();
      return;
    }

    // Build positions for edges where both endpoints are visible
    const tempPositions: number[] = [];

    for (let i = 0; i < links.length; i++) {
      const link = links[i];
      const source = nodes[link.sourceIdx];
      const target = nodes[link.targetIdx];

      const sourceVisible = visibleCommunities.has(source.community);
      const targetVisible = visibleCommunities.has(target.community);

      if (sourceVisible && targetVisible) {
        tempPositions.push(
          source.x, source.y, source.z,
          target.x, target.y, target.z,
        );
      }
    }

    const positions = new Float32Array(tempPositions);
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    lineSegments.geometry.dispose();
    lineSegments.geometry = geometry;
  }, [nodes, links, edgesVisible, visibleCommunities, selectedNodeIdx]);

  // Determine edge color: highlight edges connected to selected node
  const edgeColor = selectedNodeIdx !== null ? '#888888' : '#666666';
  const edgeOpacity = selectedNodeIdx !== null ? 0.4 : 0.25;

  return (
    <lineSegments ref={ref}>
      <lineBasicMaterial
        color={edgeColor}
        opacity={edgeOpacity}
        transparent
        depthWrite={false}
      />
    </lineSegments>
  );
};

export default Edges;
