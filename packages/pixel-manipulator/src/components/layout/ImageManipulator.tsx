import { ErrorBoundary } from '@repo/ui/ErrorBoundary';
import { Outputs } from '../output/Outputs';
import { ControlsPanel } from './ControlsPanel';

function ImageManipulator() {
  return (
    <ErrorBoundary>
      <div className="flex min-h-dvh">
        <main className="landscape:mr-72 min-w-0 flex-1">
          <Outputs />
        </main>
        <ControlsPanel />
      </div>
    </ErrorBoundary>
  );
}

export { ImageManipulator };
