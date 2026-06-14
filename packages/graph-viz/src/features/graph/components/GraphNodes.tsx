import { nodes as nodeConfig, nodeHealth } from '../../../config';
import { useDataStore } from '../../../stores/dataStore';
import type { GraphLink, GraphNode } from '../../../types';
import { useNodeHealthGroups } from '../hooks/useNodeHealthGroups';
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
  // Find max degree for normalization (simple loop, kept inline)
  let maxDegree = 0;
  if (degrees) {
    for (let i = 0; i < degrees.length; i++) {
      if (degrees[i]! > maxDegree) maxDegree = degrees[i]!;
    }
  }

  // Fallback store read for rawLinks (global data, not component logic)
  const rawLinks = useDataStore((s) => s.graphData?.links ?? []);
  const allLinks = linksProp ?? rawLinks;

  // Delegate health classification to the hook
  const healthGroups = useNodeHealthGroups(nodes, allLinks, degrees);

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
