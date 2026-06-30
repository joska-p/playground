import { Canvas } from '@react-three/fiber';
import { CAMERA_FAR, CAMERA_FOV, CAMERA_NEAR, CAMERA_Z } from '../../config.ts';
import { Scene } from './Scene.tsx';

function AutomatonCanvas() {
  return (
    <Canvas
      orthographic
      camera={{
        fov: CAMERA_FOV,
        near: CAMERA_NEAR,
        far: CAMERA_FAR,
        position: [0, 0, CAMERA_Z]
      }}
      gl={{
        preserveDrawingBuffer: true,
        powerPreference: 'high-performance'
      }}
    >
      <Scene />
    </Canvas>
  );
}

export { AutomatonCanvas };
