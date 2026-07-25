import { ErrorBoundary } from '@repo/ui/feedback';
import { ControlPanel } from './components/ControlPanel';
import { Samples } from './components/Samples';

function App() {
  return (
    <ErrorBoundary>
      <div className="bg-background text-foreground relative h-screen overflow-hidden">
        <Samples />
        <ControlPanel />
      </div>
    </ErrorBoundary>
  );
}

export { App };
