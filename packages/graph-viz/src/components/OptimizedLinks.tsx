import { useMemo } from 'react';
import {
  BufferGeometry,
  Float32BufferAttribute,
  LineBasicMaterial,
} from 'three';

import type { Link3D, Node3D } from '../types/graph';

type OptimizedLinksProps = {
  links: Link3D[];
  nodeMap: Map<string, Node3D>;
  selectedNode?: string;
  showLinks: boolean;
};

function OptimizedLinks({
  links,
  nodeMap,
  selectedNode,
  showLinks,
}: OptimizedLinksProps) {
  const { geometry, material } = useMemo(() => {
    const positions: number[] = [];
    const colors: number[] = [];

    links.forEach((link) => {
      const source = nodeMap.get(link.sourceId);
      const target = nodeMap.get(link.targetId);

      if (!source || !target) return;

      // Only show links connected to selected node
      const isConnectedToSelected =
        selectedNode &&
        (link.sourceId === selectedNode || link.targetId === selectedNode);

      if (!showLinks || !isConnectedToSelected) {
        return;
      }

      // Add line segment
      positions.push(source.x, source.y, source.z);
      positions.push(target.x, target.y, target.z);

      // Full opacity for selected node's connections
      const r = 0.8;
      const g = 0.8;
      const b = 0.8;

      colors.push(r, g, b);
      colors.push(r, g, b);
    });

    const geom = new BufferGeometry();
    geom.setAttribute('position', new Float32BufferAttribute(positions, 3));
    geom.setAttribute('color', new Float32BufferAttribute(colors, 3));

    const mat = new LineBasicMaterial({
      linewidth: 1.5,
      vertexColors: true,
      transparent: true,
      depthWrite: false,
    });

    return { geometry: geom, material: mat };
  }, [links, nodeMap, selectedNode, showLinks]);

  return (
    <lineSegments
      geometry={geometry}
      material={material}
    />
  );
}

export { OptimizedLinks };
