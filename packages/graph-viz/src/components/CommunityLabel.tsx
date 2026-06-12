import { Text } from '@react-three/drei';
import type {} from '@react-three/fiber';

type CommunityLabelProps = {
  label: string;
  position: [number, number, number];
  fontSize?: number;
  color?: string;
  offsetY?: number;
};

function CommunityLabel({
  label,
  position,
  fontSize = 1.8,
  color = '#ffffff',
  offsetY = 2
}: CommunityLabelProps) {
  return (
    <Text
      position={[position[0], position[1] + offsetY, position[2]]}
      fontSize={fontSize}
      color={color}
      anchorX="center"
      anchorY="middle"
      outlineWidth={0.04}
      outlineColor="#000000"
      outlineOpacity={0.8}
    >
      {label}
    </Text>
  );
}

export { CommunityLabel };
