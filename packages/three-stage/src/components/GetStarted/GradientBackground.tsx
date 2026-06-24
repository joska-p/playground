import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

type GetSpritesDataProps = {
  numSprites?: number;
  radius?: number;
  z?: number;
  hue?: number;
  sat?: number;
  baseSize?: number;
};

function getSpritesData({
  numSprites = 8,
  radius = 10,
  z = -15.5,
  hue = 0.5,
  sat = 0.5,
  baseSize = 24
}: GetSpritesDataProps) {
  return Array.from({ length: numSprites }).map((_, i) => {
    // 1. Normalized angle around the circle (0 to 2*PI)
    const angle = (i / numSprites) * Math.PI * 2;

    // 2. Normalized distance from the center (0 to 1)
    const distanceFactor = Math.random();

    const position = new THREE.Vector3(
      Math.cos(angle) * distanceFactor * radius,
      -Math.sin(angle) * distanceFactor * radius,
      z + Math.random()
    );

    // 3. Size variance using a predictable modifier
    const sizeModifier = baseSize * (1 + (Math.random() - 0.5) * 0.1);
    const scale = new THREE.Vector3(sizeModifier, sizeModifier, 1);

    const color = new THREE.Color().setHSL(hue, 1, sat);
    color.offsetHSL(0, 0, Math.random() * 0.2 - 0.1);

    return { id: i, position, scale, color };
  });
}

type GradientBackgroundProps = {
  opacity?: number;
  hasFog?: boolean;
  path?: string;
};

export function GradientBackground({
  opacity = 0.2,
  hasFog = true,
  path = './assets/rad-grad.png'
}: GradientBackgroundProps) {
  const texture = useTexture(path);

  // FIX: useMemo prevents recalculating positions on every React render
  const spritesData = getSpritesData({ radius: 12, baseSize: 20 });

  return (
    <group>
      {spritesData.map((sprite) => (
        <sprite
          key={sprite.id}
          position={sprite.position}
          scale={sprite.scale}
        >
          <spriteMaterial
            attach="material"
            map={texture}
            color={sprite.color}
            transparent
            opacity={opacity}
            fog={hasFog}
            rotation={0}
          />
        </sprite>
      ))}
    </group>
  );
}
