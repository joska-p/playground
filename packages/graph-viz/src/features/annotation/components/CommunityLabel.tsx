import { Text } from '@react-three/drei';
import type {} from '@react-three/fiber';
import { communityLabel } from '../../../config';

type CommunityLabelProps = {
  label: string;
  position: [number, number, number];
  fontSize?: number;
  color?: string;
  offsetY?: number;
};

/**
 * Renders a 3D text label for a community.
 * Pure presentational — no logic beyond rendering.
 */
function CommunityLabel({
  label,
  position,
  fontSize = communityLabel.defaultFontSize,
  color = '#ffffff',
  offsetY = communityLabel.defaultOffsetY
}: CommunityLabelProps) {
  return (
    <Text
      position={[position[0], position[1] + offsetY, position[2]]}
      fontSize={fontSize}
      color={color}
      anchorX="center"
      anchorY="middle"
      outlineWidth={communityLabel.outlineWidth}
      outlineColor={communityLabel.outlineColor}
      outlineOpacity={communityLabel.outlineOpacity}
    >
      {label}
    </Text>
  );
}

export { CommunityLabel };
