import { ErrorBoundary } from '@repo/ui/ErrorBoundary';
import { ControlPanel } from './components/control-panel/ControlPanel';
import { FloatingInspector } from './components/inspector/FloatingInspector';
import { RandomArtCanvas } from './components/RandomArtCanvas';

function App() {
  return (
    <div className="bg-background text-foreground relative h-screen overflow-hidden">
      <ErrorBoundary>
        <RandomArtCanvas />
        <ControlPanel />
        <FloatingInspector />
      </ErrorBoundary>
    </div>
  );
}

export { App };
