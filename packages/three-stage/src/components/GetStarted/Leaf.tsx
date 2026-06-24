import { Instance } from '@react-three/drei';
import { Quaternion, Vector3 } from 'three';

type LeafProps = {
  scale?: Vector3;
  position?: Vector3;
};

function Leaf({
  scale = new Vector3(1, 1, 1),
  position = new Vector3(0, 0, 0)
}: LeafProps) {
  return (
    <Instance
      position={position}
      quaternion={new Quaternion().random()}
      scale={scale}
    />
  );
}

export { Leaf };
