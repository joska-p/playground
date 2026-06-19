import { ErrorBoundary } from '@repo/ui/ErrorBoundary';
import { Sidebar } from '@repo/ui/Sidebar';
import { Controls } from './components/controls/Controls';
import { GrammarList } from './components/controls/GrammarList';
import { InspectorPanel } from './components/inspector/InspectorPanel';
import { RandomArtCanvas } from './components/RandomArtCanvas';

function App() {
  return (
    <ErrorBoundary>
      <Sidebar
        desktopPosition="right"
        mobilePosition="bottom"
        className="bg-background text-foreground h-screen"
      >
        <Sidebar.Main className="mx-auto flex w-full flex-col gap-6 overflow-y-auto p-4 sm:p-8">
          <Controls />
          <div className="flex min-h-0 flex-1 items-center justify-center">
            <RandomArtCanvas />
          </div>
          <GrammarList />
        </Sidebar.Main>

        <Sidebar.Panel className="hidden flex-col gap-4 overflow-y-auto p-4 lg:flex! lg:h-full lg:w-96">
          <InspectorPanel />
        </Sidebar.Panel>
      </Sidebar>
    </ErrorBoundary>
  );
}

export { App };
