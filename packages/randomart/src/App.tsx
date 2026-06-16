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
        className="bg-background text-foreground"
      >
        <Sidebar.Main className="grid min-h-screen grid-rows-[auto_1fr] place-content-center gap-8 p-4 sm:p-8">
          <header className="space-y-4 text-center">
            <h1 className="text-utility-4 text-3xl font-extrabold tracking-tight">
              AST &amp; Grammar Inspector
            </h1>
            <p className="text-muted-foreground text-sm">
              Peek inside the execution logs of your visual language
            </p>
          </header>

          <div className="border-border bg-card flex max-w-2xl flex-col gap-8 rounded-2xl border p-4 sm:p-8">
            <Controls />
            <RandomArtCanvas />
            <GrammarList />
          </div>
        </Sidebar.Main>

        <Sidebar.Panel className="flex flex-col gap-4 overflow-y-auto p-4 lg:h-full lg:w-96">
          <InspectorPanel />
        </Sidebar.Panel>
      </Sidebar>
    </ErrorBoundary>
  );
}

export { App };
