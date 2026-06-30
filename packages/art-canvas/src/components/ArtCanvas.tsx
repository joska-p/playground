import { Canvas } from '@react-three/fiber';
import { useInputMode, useSeed } from '../stores/ui/selectors';
import { ControlsPanel } from './controls-panel/ControlsPanel';
import { FoldedSpace } from './folded-space/FoldedSpace';
import { FromSeed } from './from-seed/FromSeed';

export function ArtCanvas() {
  const seed = useSeed();
  const inputMode = useInputMode();

  return (
    <>
      <ControlsPanel />
      <Canvas camera={{ position: [0, 0, 1] }}>
        {inputMode === 'seed' && <FromSeed seed={seed} />}
        {inputMode === 'manual' && <FoldedSpace />}
      </Canvas>
    </>
  );
}
