import { ErrorBoundary } from '@repo/ui/feedback';
import { ControlPanel } from './components/controls/ControlPanel';
import { FloatingInspector } from './components/inspector/FloatingInspector';
import { RandomArtCanvas } from './components/RandomArtCanvas';
import { FloatingWeightPanel } from './components/weights/FloatingWeightPanel';

function App() {
  return (
    <div className="relative h-screen overflow-hidden">
      <ErrorBoundary>
        <RandomArtCanvas />
        <ControlPanel />
        <FloatingInspector />
        <FloatingWeightPanel />
      </ErrorBoundary>
    </div>
  );
}

export { App };
