import { useRef } from 'react';
import type { Group } from 'three';
import { Euler, Vector3 } from 'three';
import { Leaf } from './Leaf';

type BranchProps = {
  amount?: number;
  maxSpread?: number;
  position?: Vector3;
  rotation?: Euler;
};

function Branch({
  amount = 20,
  maxSpread = 10,
  position = new Vector3(0, 0, 0),
  rotation = new Euler(0, 0, 0)
}: BranchProps) {
  const groupRef = useRef<Group>(null);

  const Leaves = Array.from({ length: amount }).map((_, i) => {
    const relativeScale = amount > 1 ? i / (amount - 1) : 0;

    return (
      <Leaf
        key={i}
        relativeScale={relativeScale}
        maxSpread={maxSpread}
      />
    );
  });

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
    >
      {Leaves}
    </group>
  );
}

export { Branch };
