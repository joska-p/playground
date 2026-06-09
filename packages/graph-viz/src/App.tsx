import { GraphViz } from './components/GraphViz';
import type { GraphData } from './components/types';
import graphData from './data/graph.json';

function App() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <div style={{ width: '100vw', height: '100vh' }}>
        <GraphViz
          data={graphData as GraphData}
          onNodeSelect={(n) => console.log(n)}
        />
      </div>
      ;
    </div>
  );
}

export { App };
