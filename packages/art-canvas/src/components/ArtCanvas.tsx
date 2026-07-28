import { GraphicsProvider } from '@repo/graphics/react/FrameLoopContext';
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
      <GraphicsProvider>
        <div style={{ width: '100%', height: '100%' }}>
          {inputMode === 'seed' && <SeedCanvas />}
          {inputMode === 'folded-space' && <FoldedSpace />}
          {inputMode === 'atlas' && <Atlas />}
          {inputMode === 'manual' && <Manual />}
        </div>
      </GraphicsProvider>
    </>
  );
}
