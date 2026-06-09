import { ErrorBoundary } from 'react-error-boundary';
import { Sidebar } from '@repo/ui/Sidebar';
import { Controls } from './components/controls/Controls';
import { MosaicDisplay } from './components/MosaicDisplay';

function Fallback() {
  return (
    <div className="flex h-dvh items-center justify-center p-8 text-center">
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
          desktopPosition="right"
          mobilePosition="bottom"
        >
          <Sidebar.Toggle />
          <Sidebar.Main>
            <MosaicDisplay />
          </Sidebar.Main>

          <Sidebar.Panel>
            <Controls />
          </Sidebar.Panel>
        </Sidebar>
      </div>
    </ErrorBoundary>
  );
}

export { App };
