import { ErrorBoundary } from '@repo/ui/ErrorBoundary';
import { Sidebar } from '@repo/ui/Sidebar';
import { Controls } from './components/controls/Controls';
import { GrammarList } from './components/inspector/GrammarList';
import { InspectorPanel } from './components/inspector/InspectorPanel';
import { RandomArtCanvas } from './components/RandomArtCanvas';

function App() {
  return (
    <ErrorBoundary>
      <Sidebar
        desktopPosition="right"
        mobilePosition="bottom"
        className="bg-background text-foreground min-h-dvh"
      >
        <Sidebar.Main className="mx-auto flex w-full flex-col gap-6 overflow-y-auto p-4 sm:p-8">
          <header className="space-y-4 text-center">
            <h1 className="text-utility-4 text-3xl font-extrabold tracking-tight">
              randomart
            </h1>
            <p className="text-muted-foreground text-sm">
              generative art from expression trees
            </p>
          </header>
          <Controls />
          <div className="flex min-h-0 flex-1 items-center justify-center">
            <RandomArtCanvas />
          </div>
          <GrammarList />
        </Sidebar.Main>

        <Sidebar.Panel className="flex flex-col gap-4 overflow-y-auto p-4 lg:h-full lg:w-96">
          <InspectorPanel />
        </Sidebar.Panel>
      </Sidebar>
    </ErrorBoundary>
  );
}

export { App };
