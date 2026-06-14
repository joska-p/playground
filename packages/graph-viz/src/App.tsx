import { Sidebar } from '@repo/ui/Sidebar';
import { ErrorBoundary, getErrorMessage } from 'react-error-boundary';
import { FilterControls } from './components/controls/FilterControls.tsx';
import { DetailsPanel } from './components/details-panel/DetailsPanel.tsx';
import { GraphCanvas } from './components/scene/GraphCanvas.tsx';
import { graphDataSchema } from './data/graphData.schema.ts';
import rawData from './data/processed-graph.json' with { type: 'json' };
import { initGraphData } from './stores/content/actions';

const parseResult = graphDataSchema.safeParse(rawData);

if (parseResult.success) {
  initGraphData(parseResult.data);
}

function App() {
  if (!parseResult.success) {
    return (
      <div role="alert">
        <p>Invalid graph data:</p>
        <pre className="text-xs whitespace-pre-wrap">
          {parseResult.error.toString()}
        </pre>
      </div>
    );
  }

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
          <GraphCanvas />
        </Sidebar.Main>

        <Sidebar.Panel className="w-100 space-y-4 p-4">
          <DetailsPanel />
          <FilterControls />
        </Sidebar.Panel>
      </Sidebar>
    </ErrorBoundary>
  );
}

export { App };
