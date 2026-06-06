import { AutomatonCanvas } from './components/AutomatonCanvas.tsx';
import { AutomatonProvider } from './components/AutomatonProvider.tsx';
import { Controls } from './components/Controls.tsx';

type AppProps = {
  rows?: number;
  cols?: number;
  seed?: number;
  initialDensity?: number;
};

function App({ rows = 100, cols = 100, seed, initialDensity }: AppProps) {
  return (
    <div className="h-dvh w-full overflow-hidden bg-[#0f172a]">
      <AutomatonProvider rows={rows} cols={cols} seed={seed} initialDensity={initialDensity}>
        <div className="relative h-full w-full">
          <AutomatonCanvas className="h-full w-full" />
          <Controls className="absolute left-2 top-2 z-10" />
        </div>
      </AutomatonProvider>
    </div>
  );
}

export { App };
export type { AppProps };
