import { Canvas } from '@react-three/fiber';
import {
  setBranchAmount,
  setBrancheOffsetFromCenter,
  setLeafAmount,
  setLeafMaxSpread
} from '../../stores/getStarted/actions';
import { Scene } from './Scene';

function GetStarted() {
  setLeafAmount(20);
  setLeafMaxSpread(10);
  setBranchAmount(12);
  setBrancheOffsetFromCenter(1);

  return (
    <div className="h-screen">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <Scene />
      </Canvas>
    </div>
  );
}

export { GetStarted };
