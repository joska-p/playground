import { Scene } from './components/Scene';
import { GraphicsProvider } from '@repo/graphics/react/FrameLoopContext';

function App() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <GraphicsProvider>
        <Scene />
      </GraphicsProvider>
    </div>
  );
}

export { App };
