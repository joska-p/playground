import { ErrorBoundary } from '@repo/ui/ErrorBoundary';
import { Sidebar } from '@repo/ui/Sidebar';
import { Controls } from './components/controls/Controls';
import { MosaicDisplay } from './components/MosaicDisplay';

function App() {
  return (
    <ErrorBoundary>
      <div className="bg-background text-foreground h-dvh">
        <Sidebar
          desktopPosition="left"
          mobilePosition="bottom"
          className="group"
        >
          <Sidebar.Toggle className="absolute bottom-3 left-3 z-50" />
          <Sidebar.Main>
            <MosaicDisplay />
          </Sidebar.Main>

          <Sidebar.Panel className="grid grid-rows-[auto_minmax(0,1fr)] gap-4 overflow-y-auto p-4 lg:w-96">
            <Controls />
          </Sidebar.Panel>
        </Sidebar>
      </div>
    </ErrorBoundary>
  );
}

export { App };
