import type {
  GraphData,
  GraphLink,
  GraphNode
} from '../../data/graphData.types';
import { useSelectedNodeIdx } from '../../stores/graph/selectors';
import { GraphOverview } from './graph-overview/GraphOverview';
import { NodeDetails } from './node-details/NodeDetails';

type DetailsPanelProps = {
  nodes: GraphNode[];
  links: GraphLink[];
  communities: GraphData['communities'];
};

function DetailsPanel({ nodes, links, communities }: DetailsPanelProps) {
  const selectedNodeIdx = useSelectedNodeIdx();
  const selectedNode = selectedNodeIdx !== null ? nodes[selectedNodeIdx] : null;

  if (selectedNode && selectedNodeIdx !== null) {
    return (
      <NodeDetails
        node={selectedNode}
        nodes={nodes}
        links={links}
        idx={selectedNodeIdx}
        communities={communities}
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
