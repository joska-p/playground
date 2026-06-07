import { useEffect } from 'react';
import { Sidebar } from '@repo/ui/Sidebar';
import { AutomatonCanvas } from './components/canvas/AutomatonCanvas.tsx';
import { Controls } from './components/controls/Controls.tsx';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import { init, destroy } from './stores/simulation/actions.ts';
import {
  GRID_DEFAULT_ROWS,
  GRID_DEFAULT_COLS,
  GRID_DEFAULT_DENSITY,
} from './config.ts';

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
    <div className="h-dvh bg-background text-foreground">
      <ErrorBoundary>
        <Sidebar
          mobilePosition="bottom"
          desktopPosition="left"
        >
          <Sidebar.Main>
            <AutomatonCanvas className="h-full w-full" />
          </Sidebar.Main>
          <Sidebar.Panel>
            <Controls />
          </Sidebar.Panel>
          <Sidebar.Toggle />
        </Sidebar>
      </ErrorBoundary>
    </div>
  );
}

export { App };
export type { AppProps };
