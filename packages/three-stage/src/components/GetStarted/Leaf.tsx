import { useRef } from 'react';
import type { Mesh } from 'three';
import { Euler, Quaternion, Vector3 } from 'three';

type LeafProps = {
  relativeScale: number; // Normalized value between 0 and 1
  maxSpread?: number;
};

function Leaf({ relativeScale, maxSpread = 3 }: LeafProps) {
  const meshRef = useRef<Mesh>(null);

  const size = 1 - relativeScale;

  const position = new Vector3(0, relativeScale * maxSpread, 0);

  const quaternion = new Quaternion().random();
  const rotation = new Euler().setFromQuaternion(quaternion);

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={rotation}
    >
      <boxGeometry args={[size, size, size]} />
      <meshStandardMaterial color="yellow" />
    </mesh>
  );
}

export { Leaf };
