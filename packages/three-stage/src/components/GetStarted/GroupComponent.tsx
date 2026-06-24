import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import type { Group } from 'three';
import { MeshComponent } from './MeshComponent';

function GroupComponent() {
  const groupRef = useRef<Group>(null);
  const amount = 20;

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.x += 0.001;
      groupRef.current.rotation.y += 0.002;
    }
  });

  // Generate meshes using normalized progress
  const meshes = Array.from({ length: amount }).map((_, i) => {
    // Avoid division by zero if amount is 1
    const relativeScale = amount > 1 ? i / (amount - 1) : 0;

    return (
      <MeshComponent
        key={i}
        relativeScale={relativeScale}
        maxSpread={10} // Control the overall height here safely!
      />
    );
  });

  return <group ref={groupRef}>{meshes}</group>;
}

export { GroupComponent };
