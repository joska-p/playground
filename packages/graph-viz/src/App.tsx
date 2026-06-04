import graphData from './data/graph.json';
import { GraphViz } from './components/GraphViz';

function App() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <GraphViz
        data={graphData}
        onNodeSelect={(node) => console.log(node)}
      />
    </div>
  );
}

export { App };
