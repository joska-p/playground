import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import type { Group } from 'three';
import { Euler, Vector3 } from 'three';
import { Branch } from './Branch';

type RootProps = {
  amount?: number;
  maxSpread?: number;
};

function Root({ amount = 8, maxSpread = 10 }: RootProps) {
  const groupRef = useRef<Group>(null);
  const distanceFromCenter = 1.5;

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.x += 0.001;
      groupRef.current.rotation.y += 0.002;
    }
  });

  const Branches = Array.from({ length: amount }).map((_, i) => {
    const relativeScale = i / amount;
    const angleZ = relativeScale * Math.PI * 2;
    const rotation = new Euler(0, 0, angleZ);

    const position = new Vector3(
      -Math.sin(angleZ) * distanceFromCenter,
      Math.cos(angleZ) * distanceFromCenter,
      0
    );

    return (
      <Branch
        key={i}
        maxSpread={maxSpread}
        rotation={rotation}
        position={position}
      />
    );
  });

  return <group ref={groupRef}>{Branches}</group>;
}

export { Root };
