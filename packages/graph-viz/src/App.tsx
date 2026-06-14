import { Sidebar } from '@repo/ui/Sidebar';
import { ErrorBoundary, getErrorMessage } from 'react-error-boundary';
import { FilterControls } from './components/controls/FilterControls.tsx';
import { DetailsPanel } from './components/details-panel/DetailsPanel.tsx';
import { GraphCanvas } from './components/scene/GraphCanvas.tsx';
import type { GraphData } from './data/graphData.types.ts';
import rawData from './data/processed-graph.json' with { type: 'json' };

const data = rawData as unknown as GraphData;

function App() {
  return (
    <ErrorBoundary
      fallbackRender={({ error }) => (
        <div role="alert">
          <p>Something went wrong:</p>
          <pre>{getErrorMessage(error)}</pre>
        </div>
      )}
      onError={(error, info) => {
        console.log('Error', error);
        console.log('Info', info);
      }}
    >
      <Sidebar
        mobilePosition="bottom"
        desktopPosition="right"
        variant="ghost"
        className="bg-background text-foreground min-h-screen"
      >
        <Sidebar.Main>
          <GraphCanvas data={data} />
        </Sidebar.Main>

        <Sidebar.Panel className="w-100 space-y-4 p-4">
          <DetailsPanel
            nodes={data.nodes}
            links={data.links}
            communities={data.communities}
          />
          <FilterControls
            nodes={data.nodes}
            communities={data.communities}
          />
        </Sidebar.Panel>
      </Sidebar>
    </ErrorBoundary>
  );
}

export { App };
