import { Activity } from 'react';
import { Scene } from './components/Scene';
import { PerturbationScene } from './components/PerturbationScene';
import { FrameLoopProvider } from '@repo/graphics/2d/react/FrameLoopContext';
import { ControlPanel } from './components/ControlPanel';
import { useRenderer } from './stores/store';

function App() {
  const renderer = useRenderer();

  return (
    <div className="bg-background text-foreground min-h-screen grid place-items-center relative">
      <div className="aspect-square landscape:h-screen portrait:w-screen">
        <FrameLoopProvider>
          <Activity mode={renderer === 'double-single' ? 'visible' : 'hidden'}>
            {<Scene />}
          </Activity>
          <Activity mode={renderer === 'perturbation' ? 'visible' : 'hidden'}>
            <PerturbationScene />
          </Activity>
        </FrameLoopProvider>
      </div>
      <ControlPanel />
    </div>
  );
}

export { App };
