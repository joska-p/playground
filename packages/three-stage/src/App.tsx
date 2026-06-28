import { ErrorBoundary } from '@repo/ui/ErrorBoundary';
//import { Scene } from './components/scene/Scene';
//import { GetStarted } from './components/GetStarted';
import { ArtCanvas } from './components/art-canvas/ArtCanvas';

function App() {
  return (
    <div className="bg-background text-foreground h-screen">
      <ErrorBoundary>
        <ArtCanvas />
      </ErrorBoundary>
    </div>
  );
}

export { App };
