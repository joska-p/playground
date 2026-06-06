import { AutomatonCanvas } from './components/AutomatonCanvas.tsx';
import { AutomatonProvider } from './components/AutomatonProvider.tsx';
import { Controls } from './components/Controls.tsx';

function App() {
  return (
    <div className="h-screen w-screen overflow-hidden bg-[#0f172a]">
      <AutomatonProvider rows={100} cols={100}>
        <div className="relative h-full w-full">
          <AutomatonCanvas className="h-full w-full" />
          <Controls className="absolute left-2 top-2 z-10" />
        </div>
      </AutomatonProvider>
    </div>
  );
}

export { App };
