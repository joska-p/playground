import { useEdgesVisible, useSelectedNodeIdx, useVisibleCommunities } from '../stores/graph/selectors';
import type { GraphLink, GraphNode } from './graphData.types';

type EdgesProps = {
  nodes: GraphNode[];
  links: GraphLink[];
};

function Edges({ nodes, links }: EdgesProps) {
  const edgesVisible = useEdgesVisible();
  const visibleCommunities = useVisibleCommunities();
  const selectedNodeIdx = useSelectedNodeIdx();

  // Compute positions declaratively (React Compiler handles memoization)
  let positions = new Float32Array();
  if (edgesVisible) {
    const tempPositions: number[] = [];

    for (let i = 0; i < links.length; i++) {
      const link = links[i];
      const source = nodes[link.sourceIdx];
      const target = nodes[link.targetIdx];

      const sourceVisible = visibleCommunities.has(source.community);
      const targetVisible = visibleCommunities.has(target.community);

      if (sourceVisible && targetVisible) {
        tempPositions.push(
          source.x,
          source.y,
          source.z,
          target.x,
          target.y,
          target.z
        );
      }
    }

    positions = new Float32Array(tempPositions);
  }

  // Determine edge color: highlight edges connected to selected node
  const edgeColor = selectedNodeIdx !== null ? '#888888' : '#666666';
  const edgeOpacity = selectedNodeIdx !== null ? 0.4 : 0.25;

  return (
    <lineSegments>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <lineBasicMaterial
        color={edgeColor}
        opacity={edgeOpacity}
        transparent
        depthWrite={false}
      />
    </lineSegments>
  );
}

export { Edges };
