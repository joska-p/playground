import { ErrorBoundary } from '@repo/ui/ErrorBoundary';
import { Sidebar } from '@repo/ui/Sidebar';
import { Controls } from './components/controls/Controls';
import { SequenceDisplay } from './components/sequence-display/SequenceDisplay';

function App() {
  return (
    <ErrorBoundary>
      <div className="bg-background text-foreground h-screen">
        <Sidebar
          desktopPosition="bottom"
          mobilePosition="bottom"
        >
          <Sidebar.Main>
            <SequenceDisplay />
          </Sidebar.Main>

          <Sidebar.Panel className="h-fit">
            <Controls />
          </Sidebar.Panel>
        </Sidebar>
      </div>
    </ErrorBoundary>
  );
}

export { App };
