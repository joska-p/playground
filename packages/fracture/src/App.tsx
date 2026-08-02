import { Activity } from 'react';
import { DoubleSplitScene } from './components/DoubleSplitScene';
import { PerturbationScene } from './components/PerturbationScene';
import { OriginalScene } from './components/OriginalScene';
import { FrameLoopProvider } from '@repo/graphics/2d/react/FrameLoopContext';
import { ControlPanel } from './components/ControlPanel';
import { useRenderer } from './stores/viewStore';

function App() {
  const renderer = useRenderer();

  return (
    <div className="bg-background text-foreground min-h-screen grid place-items-center relative">
      <div className="aspect-square landscape:h-screen portrait:w-screen">
        <FrameLoopProvider>
          <Activity mode={renderer === 'double-single' ? 'visible' : 'hidden'}>
            {<DoubleSplitScene />}
          </Activity>
          <Activity mode={renderer === 'perturbation' ? 'visible' : 'hidden'}>
            <PerturbationScene />
          </Activity>
          <Activity mode={renderer === 'original' ? 'visible' : 'hidden'}>
            <OriginalScene />
          </Activity>
        </FrameLoopProvider>
      </div>
      <ControlPanel />
    </div>
  );
}

export { App };
