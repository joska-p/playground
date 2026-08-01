import { Scene } from './components/Scene';
import { FrameLoopProvider } from '@repo/graphics/2d/react/FrameLoopContext';
import { ControlPanel } from './components/ControlPanel';

function App() {
  return (
    <div className="bg-background text-foreground min-h-screen grid place-items-center relative">
      <div className="aspect-square landscape:h-screen portrait:w-screen">
        <FrameLoopProvider>
          <Scene />
        </FrameLoopProvider>
      </div>
      <ControlPanel />
    </div>
  );
}

export { App };
