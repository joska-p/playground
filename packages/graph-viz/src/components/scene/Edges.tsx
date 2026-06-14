import type { GraphLink, GraphNode } from '../../data/graphData.types';
import {
  useEdgesVisible,
  useSelectedNodeIdx,
  useVisibleCommunities
} from '../../stores/graph/selectors';

type EdgesProps = {
  nodes: GraphNode[];
  links: GraphLink[];
};

type EdgeGroupProps = {
  positions: Float32Array;
  color: string;
  opacity: number;
};

function EdgeGroup({ positions, color, opacity }: EdgeGroupProps) {
  if (positions.length === 0) return null;
  return (
    <lineSegments>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <lineBasicMaterial
        color={color}
        opacity={opacity}
        transparent
        depthWrite={false}
      />
    </lineSegments>
  );
}

const EMPTY = new Float32Array();

function Edges({ nodes, links }: EdgesProps) {
  const edgesVisible = useEdgesVisible();
  const visibleCommunities = useVisibleCommunities();
  const selectedNodeIdx = useSelectedNodeIdx();

  let connectedPositions = EMPTY;
  let disconnectedPositions = EMPTY;

  if (edgesVisible) {
    const connArr: number[] = [];
    const discArr: number[] = [];

    for (let i = 0; i < links.length; i++) {
      const link = links[i];
      const source = nodes[link.sourceIdx];
      const target = nodes[link.targetIdx];

      if (
        !visibleCommunities.has(source.community) ||
        !visibleCommunities.has(target.community)
      ) {
        continue;
      }

      const isConnected =
        selectedNodeIdx !== null &&
        (link.sourceIdx === selectedNodeIdx ||
          link.targetIdx === selectedNodeIdx);

      const buf = isConnected ? connArr : discArr;
      buf.push(source.x, source.y, source.z, target.x, target.y, target.z);
    }

    connectedPositions = new Float32Array(connArr);
    if (selectedNodeIdx !== null) {
      disconnectedPositions = new Float32Array(discArr);
    }
  }

  return (
    <>
      <EdgeGroup
        positions={connectedPositions}
        color="#888888"
        opacity={0.9}
      />
      {selectedNodeIdx !== null && (
        <EdgeGroup
          positions={disconnectedPositions}
          color="#444444"
          opacity={0.4}
        />
      )}
    </>
  );
}

export { Edges };
