import { Text } from '@react-three/drei';
import { nodeLabel } from '../../config';
import type { GraphNode } from '../../types';

type NodeLabelProps = {
  node: GraphNode;
  position: [number, number, number];
  fontSize?: number;
  color?: string;
};

function NodeLabel({
  node,
  position,
  fontSize = nodeLabel.fontSizeDefault,
  color = '#ffffff'
}: NodeLabelProps) {
  // Shorten label for display: strip path prefix, keep last segment
  const shortLabel = (() => {
    const raw = node.label;
    // If label looks like a filename, show just the name
    const parts = raw.split('/');
    return parts[parts.length - 1] ?? raw;
  })();

  return (
    <Text
      position={[position[0], position[1] + nodeLabel.offsetY, position[2]]}
      fontSize={fontSize}
      color={color}
      anchorX="center"
      anchorY="bottom"
      outlineWidth={nodeLabel.outlineWidth}
      outlineColor={nodeLabel.outlineColor}
      outlineOpacity={nodeLabel.outlineOpacity}
    >
      {shortLabel}
    </Text>
  );
}

export { NodeLabel };
