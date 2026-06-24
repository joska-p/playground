import { Instance, Instances } from '@react-three/drei';
import { Euler, Quaternion, Vector3 } from 'three';
import { sharedGeometry } from './sharedGeometry';
import { sharedMaterial } from './sharedMaterial';

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
  rotation
}: BranchProps) {
  const leaves = Array.from({ length: amount }, (_, i) => {
    const relativeScale = amount > 1 ? i / (amount - 1) : 0;
    const size = 0.8 * (1 - relativeScale) + 0.05;
    const leafPosition = new Vector3(0, relativeScale * maxSpread, 0);
    const leafRotation = new Euler().setFromQuaternion(
      new Quaternion().random()
    );

    return {
      id: i,
      position: leafPosition,
      rotation: leafRotation,
      scale: new Vector3(size, size, size)
    };
  });

  return (
    <Instances
      geometry={sharedGeometry}
      material={sharedMaterial}
      limit={amount}
      position={position}
      rotation={rotation}
    >
      {leaves.map((leaf) => (
        <Instance
          key={leaf.id}
          position={leaf.position}
          rotation={leaf.rotation}
          scale={leaf.scale}
        />
      ))}
    </Instances>
  );
}

export { Branch };
