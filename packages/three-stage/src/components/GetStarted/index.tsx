import { Canvas } from '@react-three/fiber';
import {
  setBranchAmount,
  setBrancheOffsetFromCenter,
  setLeafAmount,
  setLeafMaxSpread,
  setSpawnPresetName
} from '../../stores/getStarted/actions';
import { Scene } from './Scene';

function GetStarted() {
  setLeafAmount(20);
  setLeafMaxSpread(8);
  setBranchAmount(12);
  setBrancheOffsetFromCenter(1);
  setSpawnPresetName('octahedron');

  return (
    <div className="h-screen">
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
        <Scene />
      </Canvas>
    </div>
  );
}

export { GetStarted };
