import { Text } from '@react-three/drei';
import { useMemo } from 'react';
import type { GraphNode } from '../types';

type NodeLabelProps = {
  node: GraphNode;
  position: [number, number, number];
  fontSize?: number;
  color?: string;
};

function NodeLabel({ node, position, fontSize = 0.6, color = '#ffffff' }: NodeLabelProps) {
  // Shorten label for display: strip path prefix, keep last segment
  const shortLabel = useMemo(() => {
    const raw = node.label;
    // If label looks like a filename, show just the name
    const parts = raw.split('/');
    return parts[parts.length - 1] ?? raw;
  }, [node.label]);

  return (
    <Text
      position={[position[0], position[1] - 0.6, position[2]]}
      fontSize={fontSize}
      color={color}
      anchorX="center"
      anchorY="top"
      outlineWidth={0.03}
      outlineColor="#000000"
      outlineOpacity={0.9}
    >
      {shortLabel}
    </Text>
  );
}

export { NodeLabel };
