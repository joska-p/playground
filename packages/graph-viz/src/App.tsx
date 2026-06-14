import { Sidebar } from '@repo/ui/Sidebar';
import { FilterControls } from './components/controls/FilterControls.tsx';
import { DetailsPanel } from './components/details-panel/DetailsPanel.tsx';
import { GraphCanvas } from './components/scene/GraphCanvas.tsx';
import type { GraphData } from './data/graphData.types.ts';
import rawData from './data/processed-graph.json' with { type: 'json' };

const data = rawData as unknown as GraphData;

function App() {
  return (
    <Sidebar
      mobilePosition="bottom"
      desktopPosition="right"
      variant="ghost"
      className="bg-background text-foreground min-h-screen"
    >
      <Sidebar.Main>
        <GraphCanvas data={data} />
      </Sidebar.Main>

      <Sidebar.Panel className="space-y-4 p-4">
        <DetailsPanel
          nodes={data.nodes}
          links={data.links}
        />
        <FilterControls nodes={data.nodes} />
      </Sidebar.Panel>
    </Sidebar>
  );
}

export { App };
