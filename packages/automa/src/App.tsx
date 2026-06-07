import { Sidebar } from '@repo/ui/Sidebar';
import { useResizeObserver } from '@repo/ui/useResizeObserver';
import { AutomatonCanvas } from './components/canvas/AutomatonCanvas.tsx';
import { AutomatonProvider } from './components/AutomatonProvider.tsx';
import { Controls } from './components/controls/Controls.tsx';

type AppProps = {
  rows?: number;
  cols?: number;
  seed?: number;
  initialDensity?: number;
};

const DESKTOP_BREAKPOINT = 1024;

function App({ rows = 100, cols = 100, seed, initialDensity }: AppProps) {
  const [viewportRef, { width }] = useResizeObserver<HTMLDivElement>();
  const isDesktop = width >= DESKTOP_BREAKPOINT;

  return (
    <div
      ref={viewportRef}
      className="h-dvh w-full overflow-hidden bg-ca-dead"
    >
      <AutomatonProvider
        rows={rows}
        cols={cols}
        seed={seed}
        initialDensity={initialDensity}
      >
        <Sidebar
          defaultOpen
          mobilePosition="bottom"
          desktopPosition="left"
          variant="normal"
          panelWidth="min(70vw, 220px)"
          panelHeight="min(30vh, 180px)"
        >
          <Sidebar.Main>
            <AutomatonCanvas className="h-full w-full" />
          </Sidebar.Main>
          <Sidebar.Panel>
            <Controls orientation={isDesktop ? 'vertical' : 'horizontal'} />
          </Sidebar.Panel>
          <Sidebar.Toggle />
        </Sidebar>
      </AutomatonProvider>
    </div>
  );
}

export { App };
export type { AppProps };
