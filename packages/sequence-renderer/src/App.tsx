import { ErrorBoundary } from '@repo/ui/feedback';
import { SequenceCanvas } from './components/SequenceCanvas';
import { ControlsPanel } from './components/controls/ControlsPanel';
import { register } from './modules/fourier';

register();

function App() {
  return (
    <div className="bg-background text-foreground relative h-screen overflow-hidden">
      <ErrorBoundary>
        <SequenceCanvas />
        <ControlsPanel />
      </ErrorBoundary>
    </div>
  );
}

export { App };
