import { forwardRef, useMemo } from 'react';
import { Color, type Mesh } from 'three';

import type { Node3D } from '../types/graph';

type NodeProps = {
  node: Node3D;
  selected?: boolean;
  hovered?: boolean;
  onHover?: (id: string | undefined) => void;
  onClick?: (id: string) => void;
};

const Node = forwardRef<Mesh, NodeProps>(
  ({ node, selected, hovered, onHover, onClick }, ref) => {
    const color = useMemo(() => {
      if (selected) return new Color(0xff6b6b);
      if (hovered) return new Color(0x4ecdc4);
      const hue = (node.community ?? 0) / 20;
      const c = new Color();
      c.setHSL(hue, 0.7, 0.6);
      return c;
    }, [node.community, selected, hovered]);

    const scale = useMemo(() => {
      if (selected) return 1.5;
      if (hovered) return 1.2;
      return 1;
    }, [selected, hovered]);

    return (
      <mesh
        ref={ref}
        position={[node.x, node.y, node.z]}
        scale={scale}
        onPointerEnter={() => onHover?.(node.id)}
        onPointerLeave={() => onHover?.(undefined)}
        onClick={() => onClick?.(node.id)}
      >
        <sphereGeometry args={[2, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={selected || hovered ? 0.5 : 0.2}
        />
      </mesh>
    );
  }
);

Node.displayName = 'Node';

export { Node };
