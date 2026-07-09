import { ErrorBoundary } from '@repo/ui/feedback';
import { MosaicControlsPanel } from './components/controls/MosaicControlsPanel';
import { MosaicDisplay } from './components/MosaicDisplay';

function App() {
  return (
    <ErrorBoundary>
      <div className="relative h-screen">
        <MosaicDisplay />
        <MosaicControlsPanel />
      </div>
    </ErrorBoundary>
  );
}

export { App };
