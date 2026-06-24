import { Canvas } from '@react-three/fiber';
import { Scene } from './Scene';

function GetStarted() {
  return (
    <div className="h-screen">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <Scene />
      </Canvas>
    </div>
  );
}

export { GetStarted };
