import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import type { Group } from 'three';
import { Euler, Vector3 } from 'three';
import { Branch } from './Branch';

type RootProps = {
  amount?: number;
  maxSpread?: number;
  distanceFromCenter?: number;
};

function Root({
  amount = 8,
  maxSpread = 10,
  distanceFromCenter = 1
}: RootProps) {
  const groupRef = useRef<Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.x += 0.001;
      groupRef.current.rotation.y += 0.002;
    }
  });

  const branches = Array.from({ length: amount }, (_, i) => {
    const relativeScale = i / amount;
    const angleZ = relativeScale * Math.PI * 2;
    const rotation = new Euler(0, 0, angleZ);
    const position = new Vector3(
      -Math.sin(angleZ) * distanceFromCenter,
      Math.cos(angleZ) * distanceFromCenter,
      0
    );

    return { id: i, rotation, position };
  });

  return (
    <group ref={groupRef}>
      {branches.map((branch) => (
        <Branch
          key={branch.id}
          maxSpread={maxSpread}
          rotation={branch.rotation}
          position={branch.position}
        />
      ))}
    </group>
  );
}

export { Root };
