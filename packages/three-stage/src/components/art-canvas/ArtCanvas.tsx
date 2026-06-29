import { Canvas } from '@react-three/fiber';
import { FoldedSpace } from './folded-space/FoldedSpace';

export function ArtCanvas() {
  return (
    <Canvas camera={{ position: [0, 0, 1] }}>
      <FoldedSpace />
    </Canvas>
  );
}
