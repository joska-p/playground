import { ErrorBoundary } from '@repo/ui/feedback';
import { ControlPanel } from './components/controls/ControlPanel';
import { FloatingInspector } from './components/inspector/FloatingInspector';
import { RandomArtCanvas } from './components/RandomArtCanvas';
import { TestMode } from './components/testMode/TestMode';
import { FloatingWeightPanel } from './components/weights/FloatingWeightPanel';
import { useMode } from './stores/randomart/selectors';

function App() {
  const mode = useMode();

  return (
    <div className="relative h-screen overflow-hidden">
      <ErrorBoundary>
        {mode === 'test' ? <TestMode /> : <RandomArtCanvas />}
        <ControlPanel />
        <FloatingInspector />
        <FloatingWeightPanel />
      </ErrorBoundary>
    </div>
  );
}

export { App };
