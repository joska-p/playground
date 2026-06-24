import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import type { Group } from 'three';
import { Euler } from 'three';
import { Branch } from './Branch';

type RootProps = {
  amount?: number;
  maxSpread?: number;
};

function Root({ amount = 4, maxSpread = 10 }: RootProps) {
  const groupRef = useRef<Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.x += 0.001;
      groupRef.current.rotation.y += 0.002;
    }
  });

  const Branches = Array.from({ length: amount }).map((_, i) => {
    const relativeScale = i / amount;
    const angleX = 0;
    const angleY = 0;
    const angleZ = relativeScale * Math.PI * 2;
    const rotation = new Euler(angleX, angleY, angleZ);

    return (
      <Branch
        key={i}
        maxSpread={maxSpread}
        rotation={rotation}
      />
    );
  });

  return <group ref={groupRef}>{Branches}</group>;
}

export { Root };
