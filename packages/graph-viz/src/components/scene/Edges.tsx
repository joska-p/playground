import { computeEdgeBuffers } from '../../core/compute-edges.ts';
import { CONFIG } from '../../core/config.ts';
import { useLinks, useNodes } from '../../stores/content/selectors';
import {
  useEdgesVisible,
  useSelectedNodeIdx,
  useVisibleCommunities
} from '../../stores/view/selectors';

const { connected, disconnected } = CONFIG.edges;

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

function Edges() {
  const nodes = useNodes();
  const links = useLinks();
  const edgesVisible = useEdgesVisible();
  const visibleCommunities = useVisibleCommunities();
  const selectedNodeIdx = useSelectedNodeIdx();

  const { connectedPositions, disconnectedPositions } = computeEdgeBuffers(
    nodes,
    links,
    edgesVisible,
    visibleCommunities,
    selectedNodeIdx
  );

  return (
    <>
      <EdgeGroup
        positions={disconnectedPositions}
        color={disconnected.color}
        opacity={disconnected.opacity}
      />
      <EdgeGroup
        positions={connectedPositions}
        color={connected.color}
        opacity={connected.opacity}
      />
    </>
  );
}

export { Edges };
