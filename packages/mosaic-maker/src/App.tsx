import { Sidebar } from '@repo/ui/Sidebar';
import { ErrorBoundary } from 'react-error-boundary';
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
          desktopPosition="left"
          mobilePosition="bottom"
        >
          <Sidebar.Main>
            <MosaicDisplay />
          </Sidebar.Main>

          <Sidebar.Panel className="h-32 md:h-auto md:w-96">
            <Controls />
          </Sidebar.Panel>
        </Sidebar>
      </div>
    </ErrorBoundary>
  );
}

export { App };
