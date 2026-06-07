import { Sidebar } from '@repo/ui/Sidebar';
import { useResizeObserver } from '@repo/ui/useResizeObserver';
import { AutomatonCanvas } from './components/canvas/AutomatonCanvas.tsx';
import { AutomaProvider } from './components/AutomatonProvider.tsx';
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
      className="h-dvh w-full overflow-hidden bg-[#070a14] ca-grain"
    >
      <AutomaProvider
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
            <div className="animate-fade-in h-full w-full">
              <AutomatonCanvas className="h-full w-full" />
            </div>
          </Sidebar.Main>
          <Sidebar.Panel>
            <div className="animate-slide-up px-1 pt-1">
              <div className="mb-3 flex items-center gap-2 px-2">
                <span className="inline-block h-2 w-2 rounded-full bg-[var(--ca-alive)] shadow-[0_0_6px_2px_var(--ca-glow)]" />
                <span
                  className="text-[11px] font-medium tracking-[0.15em] uppercase"
                  style={{
                    fontFamily: 'var(--font-ca-ui)',
                    color: 'var(--color-ca-icon-muted)',
                  }}
                >
                  Automa
                </span>
              </div>
              <Controls orientation={isDesktop ? 'vertical' : 'horizontal'} />
            </div>
          </Sidebar.Panel>
          <Sidebar.Toggle />
        </Sidebar>
      </AutomaProvider>
    </div>
  );
}

export { App };
export type { AppProps };
