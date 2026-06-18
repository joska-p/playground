import { ErrorBoundary } from '@repo/ui/ErrorBoundary';
import { Sidebar } from '@repo/ui/Sidebar';
import { SequenceCanvas } from './components/canvas/SequenceCanvas';
import { SidebarControls } from './components/sidebar/SidebarControls';

function App() {
  return (
    <ErrorBoundary>
      <div className="bg-background text-foreground h-screen">
        <Sidebar
          desktopPosition="right"
          mobilePosition="bottom"
        >
          <Sidebar.Main>
            <SequenceCanvas />
          </Sidebar.Main>

          <Sidebar.Panel className="h-fit w-full overflow-y-auto lg:max-w-80">
            <SidebarControls />
          </Sidebar.Panel>
        </Sidebar>
      </div>
    </ErrorBoundary>
  );
}

export { App };
