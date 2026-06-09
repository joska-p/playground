import { Sidebar } from '@repo/ui/Sidebar';
import { useEffect } from 'react';
import { AutomatonCanvas } from './components/canvas/AutomatonCanvas.tsx';
import { Controls } from './components/controls/Controls.tsx';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import {
  GRID_DEFAULT_COLS,
  GRID_DEFAULT_DENSITY,
  GRID_DEFAULT_ROWS,
} from './core/config.ts';
import { destroy, init } from './stores/simulation/actions.ts';

type AppProps = {
  rows?: number;
  cols?: number;
  seed?: number;
  initialDensity?: number;
};

function App({
  rows = GRID_DEFAULT_ROWS,
  cols = GRID_DEFAULT_COLS,
  seed,
  initialDensity,
}: AppProps) {
  useEffect(() => {
    init({
      rows,
      cols,
      initialDensity: initialDensity ?? GRID_DEFAULT_DENSITY,
      seed: seed ?? Date.now(),
    });
    return destroy;
  }, [cols, initialDensity, rows, seed]);

  return (
    <div className="bg-background text-foreground h-dvh">
      <ErrorBoundary>
        <Sidebar
          mobilePosition="bottom"
          desktopPosition="left"
        >
          <Sidebar.Main>
            <AutomatonCanvas className="h-full w-full" />
          </Sidebar.Main>
          <Sidebar.Panel>
            <Sidebar.Toggle />
            <Controls />
          </Sidebar.Panel>
        </Sidebar>
      </ErrorBoundary>
    </div>
  );
}

export { App };
export type { AppProps };
