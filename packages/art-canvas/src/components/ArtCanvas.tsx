import { Canvas } from '@react-three/fiber';
import { FromSeed } from '../features/from-seed/FromSeed';
import { useInputMode } from '../stores/ui/selectors';
import { ControlsPanel } from './controls-panel/ControlsPanel';
import { FoldedSpace } from './folded-space/FoldedSpace';

export function ArtCanvas() {
  const inputMode = useInputMode();

  return (
    <>
      <ControlsPanel />
      <Canvas camera={{ position: [0, 0, 1] }}>
        {inputMode === 'seed' && <FromSeed />}
        {inputMode === 'manual' && <FoldedSpace />}
      </Canvas>
    </>
  );
}
