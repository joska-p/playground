import { Canvas } from '@react-three/fiber';
import { useInputMode } from '../stores/ui/selectors';
import { ControlsPanel } from './controls/ControlsPanel';
import { Atlas } from './input-modes/atlas/Atlas';
import { FoldedSpace } from './input-modes/folded-space/FoldedSpace';
import { Manual } from './input-modes/manual/Manual';
import { SeedCanvas } from './input-modes/seed/SeedCanvas';

export function ArtCanvas() {
  const inputMode = useInputMode();

  return (
    <>
      <ControlsPanel />
      <Canvas camera={{ position: [0, 0, 1] }}>
        {inputMode === 'seed' && <SeedCanvas />}
        {inputMode === 'folded-space' && <FoldedSpace />}
        {inputMode === 'atlas' && <Atlas />}
        {inputMode === 'manual' && <Manual />}
      </Canvas>
    </>
  );
}
