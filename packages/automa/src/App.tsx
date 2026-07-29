import { GRID_DEFAULT_DENSITY } from '@repo/automa-engine/config';
import { GraphicsProvider } from '@repo/graphics/react/FrameLoopContext';
import { ErrorBoundary } from '@repo/ui/feedback';
import { useEffect } from 'react';
import { CellMesh } from './components/canvas/CellMesh.tsx';
import { GridLines } from './components/canvas/GridLines.tsx';
import { ControlPanel } from './components/controls/ControlPanel';
import { destroy, init, useShowDebug } from './stores/automa';

type AppProps = {
  rows?: number;
  cols?: number;
  seed?: number;
  initialDensity?: number;
};

function App({ rows = 300, cols = 400, seed, initialDensity }: AppProps) {
  const showDebug = useShowDebug();

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
        <GraphicsProvider>
          <CellMesh />
          {showDebug && (
            <GridLines
              cols={cols}
              rows={rows}
            />
          )}
        </GraphicsProvider>
        <ControlPanel />
      </ErrorBoundary>
    </div>
  );
}

export { App };
export type { AppProps };
