import { Sidebar } from '@repo/ui/Sidebar';
import { ErrorBoundary } from 'react-error-boundary';
import { Outputs } from '../output/Outputs';
import { Controls } from './Controls';

function ImageManipulator() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
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
