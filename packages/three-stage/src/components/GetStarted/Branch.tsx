import { Instances } from '@react-three/drei';
import { useControls } from 'leva';
import { BoxGeometry, Euler, MeshStandardMaterial, Quaternion, Vector3 } from 'three';
import { Leaf } from './Leaf';

type BranchProps = {
  position?: Vector3;
  rotation?: Euler;
};

function Branch({ position = new Vector3(0, 0, 0), rotation = new Euler(0, 0, 0) }: BranchProps) {
  const { leafAmount, leafSpread, spiralAngleFactor, distanceFromStem } = useControls('leaf', {
    leafAmount: { label: 'Amount', value: 20, min: 1, max: 20 },
    leafSpread: { label: 'Spread', value: 8, min: 1, max: 20 },
    spiralAngleFactor: { label: 'Spiral Angle Factor', value: 0.8, min: 0, max: 2.4 },
    distanceFromStem: { label: 'Distance From Stem', value: 0.2, min: 0, max: 1 }
  });

  const leaves = Array.from({ length: leafAmount }, (_, i) => {
    const relativeScale = leafAmount > 1 ? i / (leafAmount - 1) : 0;
    const size = 0.8 * (1 - relativeScale) + 0.05;
    const yOffset = relativeScale * leafSpread;
    const spiralAngle = i * spiralAngleFactor; // Golden angle or any multiplier creates a spiral
    const leafPosition = new Vector3(
      Math.sin(spiralAngle) * distanceFromStem,
      yOffset,
      Math.cos(spiralAngle) * distanceFromStem
    );
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
      geometry={new BoxGeometry(1, 1, 1)}
      material={new MeshStandardMaterial({ color: 'yellow' })}
      limit={leafAmount}
      position={position}
      rotation={rotation}
    >
      {leaves.map((leaf) => (
        <Leaf
          key={leaf.id}
          position={leaf.position}
          quaternion={leaf.quaternion} // Fixed: Passing the local rotation!
          scale={leaf.scale}
        />
      ))}
    </Instances>
  );
}

export { Branch };
