import { ErrorBoundary } from '@repo/ui/ErrorBoundary';
import { Sidebar } from '@repo/ui/Sidebar';
import { Outputs } from '../output/Outputs';
import { Controls } from './Controls';

function ImageManipulator() {
  return (
    <ErrorBoundary>
      <Sidebar
        desktopPosition="left"
        mobilePosition="bottom"
        className="min-h-dvh flex-1"
      >
        <Sidebar.Main>
          <Outputs />
        </Sidebar.Main>

        <Sidebar.Panel className="flex h-full w-80 gap-4 overflow-y-auto overscroll-auto p-2">
          <Controls />
        </Sidebar.Panel>
      </Sidebar>
    </ErrorBoundary>
  );
}

export { ImageManipulator };
