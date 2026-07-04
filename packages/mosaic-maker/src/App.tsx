import { ErrorBoundary } from '@repo/ui';
import { MosaicControlsPanel } from './components/controls/MosaicControlsPanel';
import { MosaicDisplay } from './components/MosaicDisplay';

function App() {
  return (
    <ErrorBoundary>
      <div className="bg-background text-foreground relative h-screen">
        <MosaicDisplay />
        <MosaicControlsPanel />
      </div>
    </ErrorBoundary>
  );
}

export { App };
