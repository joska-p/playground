import { Text } from '@react-three/drei';
import { nodeLabel } from '../../../config';
import type { GraphNode } from '../../../types';
import { shortenLabel } from '../services/labelUtils';

type NodeLabelProps = {
  node: GraphNode;
  position: [number, number, number];
  fontSize?: number;
  color?: string;
};

/**
 * Renders a 3D text label for a graph node.
 * Label text is shortened via `shortenLabel()` to show just the filename.
 * Pure presentational — no logic beyond rendering.
 */
function NodeLabel({
  node,
  position,
  fontSize = nodeLabel.fontSizeDefault,
  color = '#ffffff'
}: NodeLabelProps) {
  const shortLabel = shortenLabel(node.label);

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
