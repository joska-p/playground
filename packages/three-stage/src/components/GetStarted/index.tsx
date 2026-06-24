import { Canvas } from '@react-three/fiber';
import { Scene } from './Scene';

function GetStarted() {
  return (
    <div className="h-screen">
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
        <Scene />
      </Canvas>
    </div>
  );
}

export { GetStarted };
