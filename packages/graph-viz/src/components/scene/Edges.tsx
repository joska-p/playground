import { computeEdgeBuffers } from '../../core/compute-edges.ts';
import { useLinks, useNodes } from '../../stores/content/selectors';
import {
  useEdgesVisible,
  useSelectedNodeIdx,
  useVisibleCommunities
} from '../../stores/view/selectors';

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
