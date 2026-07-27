import { GRID_DEFAULT_DENSITY } from '@repo/automa-engine/config';
import { ErrorBoundary } from '@repo/ui/feedback';
import { useEffect } from 'react';
import { AutomatonCanvas } from './components/canvas/AutomatonCanvas.tsx';
import { ControlsPanel } from './components/controls/ControlsPanel.tsx';
import { destroy, init } from './stores/simulation/actions';

type AppProps = {
  rows?: number;
  cols?: number;
  seed?: number;
  initialDensity?: number;
};

function App({ rows = 300, cols = 400, seed, initialDensity }: AppProps) {
  useEffect(() => {
    init({
      rows,
      cols,
      initialDensity: initialDensity ?? GRID_DEFAULT_DENSITY,
      seed: seed ?? Date.now()
    });
    return destroy;
  }, [cols, initialDensity, rows, seed]);

  return (
    <div className="relative h-screen overflow-hidden">
      <ErrorBoundary>
        <AutomatonCanvas />
        <ControlsPanel />
      </ErrorBoundary>
    </div>
  );
}

export { App };
export type { AppProps };
