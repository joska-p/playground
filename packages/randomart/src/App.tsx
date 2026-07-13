import { ErrorBoundary } from '@repo/ui/feedback';
import { ControlPanel } from './components/controls/ControlPanel';
import { RandomArtCanvas } from './components/RandomArtCanvas';
import { TestMode } from './components/testMode/TestMode';
import { useMode } from './stores/randomart/selectors';

function App() {
  const mode = useMode();

  return (
    <div className="relative h-screen overflow-hidden">
      <ErrorBoundary>
        {mode === 'test' ? <TestMode /> : <RandomArtCanvas />}
        <ControlPanel />
      </ErrorBoundary>
    </div>
  );
}

export { App };
