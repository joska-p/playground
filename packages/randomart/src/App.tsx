import { ErrorBoundary } from '@repo/ui/ErrorBoundary';
import { Sidebar } from '@repo/ui/Sidebar';
import { Controls } from './components/controls/Controls';
import { FloatingInspector } from './components/inspector/FloatingInspector';
import { RandomArtCanvas } from './components/RandomArtCanvas';

function App() {
  return (
    <ErrorBoundary>
      <Sidebar
        desktopPosition="left"
        mobilePosition="bottom"
        className="bg-background text-foreground h-screen"
      >
        <Sidebar.Panel className="flex h-full w-96 flex-col gap-6 overflow-y-auto p-4">
          <h2 className="text-sm font-semibold tracking-wide">RandomArt</h2>
          <Controls />
        </Sidebar.Panel>

        <Sidebar.Main className="bg-background border-border relative h-full overflow-hidden border-r-2 border-l">
          <Sidebar.Toggle className="absolute top-3 left-3 z-20" />
          <RandomArtCanvas />
          <FloatingInspector />
        </Sidebar.Main>
      </Sidebar>
    </ErrorBoundary>
  );
}

export { App };
