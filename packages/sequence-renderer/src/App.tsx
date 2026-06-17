import { ErrorBoundary } from '@repo/ui/ErrorBoundary';
import { Sidebar } from '@repo/ui/Sidebar';
import { Controls } from './components/controls/Controls';
import { SequenceDisplay } from './components/sequence-display/SequenceDisplay';

function App() {
  return (
    <ErrorBoundary>
      <div className="bg-background text-foreground h-screen">
        <Sidebar
          desktopPosition="right"
          mobilePosition="bottom"
        >
          <Sidebar.Main>
            <SequenceDisplay />
          </Sidebar.Main>

          <Sidebar.Panel className="h-fit w-full overflow-y-auto lg:max-w-80">
            <Controls />
          </Sidebar.Panel>
        </Sidebar>
      </div>
    </ErrorBoundary>
  );
}

export { App };
