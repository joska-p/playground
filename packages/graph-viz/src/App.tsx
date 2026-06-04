import graphData from './data/graph.json';
import GraphVisualization from './components/GraphViz';

function App() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <GraphVisualization
        data={graphData}
        onNodeSelect={(node) => console.log(node)}
      />
    </div>
  );
}

export { App };
