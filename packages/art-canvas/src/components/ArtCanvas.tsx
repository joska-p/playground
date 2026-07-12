import { Canvas } from '@react-three/fiber';
import { Atlas } from '../modules/atlas/Atlas';
import { FoldedSpace } from '../modules/folded-space/FoldedSpace';
import { Manual } from '../modules/manual/Manual';
import { SeedCanvas } from '../modules/seed/SeedCanvas';
import { useInputMode } from '../stores/ui/store';
import { ControlsPanel } from './controls/ControlsPanel';

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
