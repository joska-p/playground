import type { GraphLink, GraphNode } from '../../data/graphData.types';
import { useSelectedNodeIdx } from '../../stores/graph/selectors';
import { GraphOverview } from './graph-overview/GraphOverview';
import { NodeDetails } from './node-details/NodeDetails';

type DetailsPanelProps = {
  nodes: GraphNode[];
  links: GraphLink[];
};

function DetailsPanel({ nodes, links }: DetailsPanelProps) {
  const selectedNodeIdx = useSelectedNodeIdx();
  const selectedNode = selectedNodeIdx ? nodes[selectedNodeIdx] : null;

  if (selectedNode && selectedNodeIdx) {
    return (
      <NodeDetails
        node={selectedNode}
        nodes={nodes}
        links={links}
        idx={selectedNodeIdx}
      />
    );
  }

  return (
    <GraphOverview
      nodes={nodes}
      links={links}
    />
  );
}

export { DetailsPanel };
