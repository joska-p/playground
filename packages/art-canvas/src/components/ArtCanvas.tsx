import { Canvas } from '@react-three/fiber';
import { SeedCanvas } from '../input-modes/seed/SeedCanvas';
import { useInputMode } from '../stores/ui/selectors';
import { ControlsPanel } from './controls/ControlsPanel';
import { FoldedSpace } from './folded-space/FoldedSpace';

export function ArtCanvas() {
  const inputMode = useInputMode();

  return (
    <>
      <ControlsPanel />
      <Canvas camera={{ position: [0, 0, 1] }}>
        {inputMode === 'seed' && <SeedCanvas />}
        {inputMode === 'manual' && <FoldedSpace />}
      </Canvas>
    </>
  );
}
