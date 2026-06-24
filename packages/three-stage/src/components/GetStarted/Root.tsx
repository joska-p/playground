import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import type { Group } from 'three';
import { Euler, Vector3 } from 'three';
import {
  useBranchAmount,
  useBrancheOffsetFromCenter
} from '../../stores/getStarted/selectors';
import { Branch } from './Branch';

function Root() {
  const groupRef = useRef<Group>(null);
  const brancheAmount = useBranchAmount();
  const brancheOffsetFromCenter = useBrancheOffsetFromCenter();
  const branches = Array.from({ length: brancheAmount }, (_, i) => {
    const relativeScale = i / brancheAmount;
    const angleZ = relativeScale * Math.PI * 2;
    const rotation = new Euler(0, 0, angleZ);
    const position = new Vector3(
      -Math.sin(angleZ) * brancheOffsetFromCenter,
      Math.cos(angleZ) * brancheOffsetFromCenter,
      0
    );

    return { id: i, rotation, position };
  });

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.x += 0.001;
      groupRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={groupRef}>
      {branches.map((branch) => (
        <Branch
          key={branch.id}
          rotation={branch.rotation}
          position={branch.position}
        />
      ))}
    </group>
  );
}

export { Root };
