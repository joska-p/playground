import { Instances } from '@react-three/drei';
import { useControls } from 'leva';
import { Euler, Quaternion, Vector3 } from 'three';
import { Leaf } from './Leaf';
import { sharedGeometry } from './sharedGeometry';
import { sharedMaterial } from './sharedMaterial';

type BranchProps = {
  position?: Vector3;
  rotation?: Euler;
};

function Branch({
  position = new Vector3(0, 0, 0),
  rotation = new Euler(0, 0, 0)
}: BranchProps) {
  const { leafAmount, leafSpread } = useControls('leaf', {
    leafAmount: {
      label: 'Amount',
      value: 20,
      min: 1,
      max: 20
    },
    leafSpread: {
      label: 'Spread',
      value: 8,
      min: 1,
      max: 20
    }
  });

  const leaves = Array.from({ length: leafAmount }, (_, i) => {
    const relativeScale = leafAmount > 1 ? i / (leafAmount - 1) : 0;
    const size = 0.8 * (1 - relativeScale) + 0.05;
    const leafPosition = new Vector3(0, relativeScale * leafSpread, 0);
    const leafRotation = new Quaternion().random();

    return {
      id: i,
      position: leafPosition,
      quaternion: leafRotation,
      scale: new Vector3(size, size, size)
    };
  });

  return (
    <Instances
      geometry={sharedGeometry}
      material={sharedMaterial}
      limit={leafAmount}
      position={position}
      rotation={rotation}
    >
      {leaves.map((leaf) => (
        <Leaf
          key={leaf.id}
          position={leaf.position}
          scale={leaf.scale}
        />
      ))}
    </Instances>
  );
}

export { Branch };
