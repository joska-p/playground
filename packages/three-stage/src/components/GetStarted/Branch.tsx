import { Instances } from '@react-three/drei';
import { Euler, Quaternion, Vector3 } from 'three';
import {
  useLeafAmount,
  useLeafMaxSpread
} from '../../stores/getStarted/selectors';
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
  const amount = useLeafAmount();
  const maxSpread = useLeafMaxSpread();

  const leaves = Array.from({ length: amount }, (_, i) => {
    const relativeScale = amount > 1 ? i / (amount - 1) : 0;
    const size = 0.8 * (1 - relativeScale) + 0.05;
    const leafPosition = new Vector3(0, relativeScale * maxSpread, 0);
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
      limit={amount}
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
