import { nodes as nodeConfig, nodeHealth } from '../../config';
import { useDataStore } from '../../stores/dataStore';
import type { GraphLink, GraphNode } from '../../types';
import { classifyNodeHealth } from '../../utils/nodes';
import type { NodeHealth } from '../../utils/nodes';
import { GraphNodesGroup } from './GraphNodesGroup';

type GraphNodesProps = {
  positions: Float32Array;
  nodes: GraphNode[];
  degrees?: Float32Array | null;
  size?: number;
  highlightIndices?: Set<number>;
  links?: GraphLink[];
  onNodeClick?: (node: GraphNode) => void;
  onPointerMoveNode?: (nodeIndex: number | null) => void;
};

function GraphNodes({
  positions,
  nodes,
  degrees = null,
  size = nodeConfig.defaultSize,
  highlightIndices,
  links: linksProp,
  onNodeClick,
  onPointerMoveNode
}: GraphNodesProps) {
  // Find max degree for normalization
  let maxDegree = 0;
  if (degrees) {
    for (let i = 0; i < degrees.length; i++) {
      if (degrees[i]! > maxDegree) maxDegree = degrees[i]!;
    }
  }

  const rawLinks = useDataStore((s) => s.graphData?.links ?? []);
  const allLinks = linksProp ?? rawLinks;
  const nodeIndex = useDataStore((s) => s.nodeIndex);

  const healthGroups = (() => {
    const groups: Record<NodeHealth, number[]> = {
      active: [],
      'low-confidence': [],
      isolated: []
    };
    for (let i = 0; i < nodes.length; i++) {
      const health = classifyNodeHealth(
        nodes[i]!.id,
        allLinks,
        degrees,
        nodeIndex,
        i
      );
      groups[health].push(i);
    }
    return groups;
  })();

  return (
    <>
      <GraphNodesGroup
        indices={healthGroups.active}
        opacity={1}
        positions={positions}
        nodes={nodes}
        degrees={degrees}
        maxDegree={maxDegree}
        size={size}
        highlightIndices={highlightIndices}
        onNodeClick={onNodeClick}
        onPointerMoveNode={onPointerMoveNode}
      />
      <GraphNodesGroup
        indices={healthGroups['low-confidence']}
        opacity={nodeHealth.lowConfidence.opacity}
        ringColor={nodeHealth.lowConfidence.ringColor}
        positions={positions}
        nodes={nodes}
        degrees={degrees}
        maxDegree={maxDegree}
        size={size}
        highlightIndices={highlightIndices}
        onNodeClick={onNodeClick}
        onPointerMoveNode={onPointerMoveNode}
      />
      <GraphNodesGroup
        indices={healthGroups.isolated}
        opacity={nodeHealth.isolated.opacity}
        ringColor={nodeHealth.isolated.ringColor}
        positions={positions}
        nodes={nodes}
        degrees={degrees}
        maxDegree={maxDegree}
        size={size}
        highlightIndices={highlightIndices}
        onNodeClick={onNodeClick}
        onPointerMoveNode={onPointerMoveNode}
      />
    </>
  );
}

export { GraphNodes };
