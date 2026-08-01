import { Scene } from './components/Scene';
import { FrameLoopProvider } from '@repo/graphics/2d/react/FrameLoopContext';

function App() {
  return (
    <div className="bg-background text-foreground min-h-screen grid place-items-center">
      <div className="aspect-square landscape:h-screen portrait:w-screen">
        <FrameLoopProvider>
          <Scene />
        </FrameLoopProvider>
      </div>
    </div>
  );
}

export { App };
