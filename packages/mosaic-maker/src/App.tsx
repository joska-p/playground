import { Sidebar } from '@repo/ui/Sidebar';
import { ErrorBoundary } from 'react-error-boundary';
import { Controls } from './components/controls/Controls';
import { MosaicDisplay } from './components/MosaicDisplay';

function Fallback() {
  return (
    <div className="grid h-dvh place-content-center p-8 text-center">
      <div>
        <h2 className="text-xl font-bold">Something went wrong</h2>
        <p className="text-foreground/60 mt-2">
          Try refreshing the page to rebuild the mosaic.
        </p>
      </div>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary FallbackComponent={Fallback}>
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
