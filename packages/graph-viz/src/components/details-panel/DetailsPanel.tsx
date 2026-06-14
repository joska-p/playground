import { useNodes } from '../../stores/content/selectors';
import { useSelectedNodeIdx } from '../../stores/view/selectors';
import { GraphOverview } from './graph-overview/GraphOverview';
import { NodeDetails } from './node-details/NodeDetails';

function DetailsPanel() {
  const nodes = useNodes();
  const selectedNodeIdx = useSelectedNodeIdx();
  const selectedNode = selectedNodeIdx !== null ? nodes[selectedNodeIdx] : null;

  if (selectedNode && selectedNodeIdx !== null) {
    return (
      <NodeDetails
        node={selectedNode}
        idx={selectedNodeIdx}
      />
    );
  }

  return <GraphOverview />;
}

export { DetailsPanel };
