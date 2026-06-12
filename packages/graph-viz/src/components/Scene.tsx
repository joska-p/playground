import { OrbitControls } from '@react-three/drei';
import { useEffect, useMemo, useRef } from 'react';
import { useDataStore } from '../stores/dataStore';
import { useUiStore } from '../stores/uiStore';
import { filterByCommunity, parseCommunityFilter } from '../utils/communities';
import { CommunityEdges } from './CommunityEdges';
import { GraphCommunitySpheres } from './GraphCommunitySpheres';
import { GraphEdges } from './GraphEdges';
import { GraphNodes } from './GraphNodes';
import { SelectedNodeGlow } from './SelectedNodeGlow';

function Scene() {
  const controlsRef = useRef(null);

  const graphData = useDataStore((s) => s.graphData);
  const positions = useDataStore((s) => s.positions);
  const communities = useDataStore((s) => s.communities);

  const communityFilter = useUiStore((s) => s.communityFilter);
  const minCommunitySize = useUiStore((s) => s.minCommunitySize);
  const autoRotate = useUiStore((s) => s.autoRotate);
  const showEdges = useUiStore((s) => s.showEdges);
  const selectNode = useUiStore((s) => s.selectNode);

  // Derive view mode from communityFilter — single numeric ID = detail mode
  const selectedCommunityId = useMemo(() => {
    const trimmed = communityFilter.trim();
    return /^\d+$/.test(trimmed) ? Number.parseInt(trimmed, 10) : null;
  }, [communityFilter]);
  const viewMode = selectedCommunityId !== null ? 'detail' : 'overview';

  // Communities to show in overview mode (filtered by communityFilter + minSize)
  const visibleCommunityIds = useMemo(() => {
    const filterIds = parseCommunityFilter(communityFilter);
    if (filterIds) return filterIds;
    if (minCommunitySize > 1) {
      return new Set(
        [...communities.values()]
          .filter((c) => c.nodeCount >= minCommunitySize)
          .map((c) => c.id),
      );
    }
    return null;
  }, [communityFilter, minCommunitySize, communities]);

  // Fly camera to community centroid when selected
  useEffect(() => {
    if (!controlsRef.current || selectedCommunityId === null) return;
    const community = communities.get(selectedCommunityId);
    if (!community) return;

    const [cx, cy, cz] = community.centroid;
    controlsRef.current.target.set(cx, cy, cz);
    controlsRef.current.update();
  }, [selectedCommunityId, communities]);

  // Reset camera target when going back to overview
  useEffect(() => {
    if (!controlsRef.current) return;
    if (viewMode === 'overview') {
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.update();
    }
  }, [viewMode]);

  // Filtered data for detail view
  const detailData = useMemo(() => {
    if (
      viewMode !== 'detail' ||
      selectedCommunityId === null ||
      !graphData ||
      !positions
    ) {
      return null;
    }
    return filterByCommunity(
      selectedCommunityId,
      positions,
      graphData.nodes,
      graphData.links
    );
  }, [viewMode, selectedCommunityId, graphData, positions]);

  if (!positions || !graphData) return null;

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[10, 20, 10]}
        intensity={1.2}
      />
      <directionalLight
        position={[-10, 0, -20]}
        intensity={0.4}
      />

      <OrbitControls
        ref={controlsRef}
        enableDamping
        dampingFactor={0.1}
        autoRotate={autoRotate}
        autoRotateSpeed={0.5}
        minDistance={1}
        maxDistance={2000}
      />

      {/* Overview mode */}
      {viewMode === 'overview' && (
        <>
          <GraphCommunitySpheres visibleIds={visibleCommunityIds} />
          {showEdges && <CommunityEdges visibleIds={visibleCommunityIds} />}
        </>
      )}

      {/* Detail mode */}
      {viewMode === 'detail' && detailData && (
        <>
          <GraphCommunitySpheres ghost />
          <GraphNodes
            positions={detailData.positions}
            nodes={detailData.nodes}
            size={8}
            opacity={1}
            onNodeClick={selectNode}
          />
          {showEdges && (
            <GraphEdges
              positions={detailData.positions}
              links={detailData.links}
              nodeIndex={detailData.nodeIndex}
            />
          )}
        </>
      )}

      <SelectedNodeGlow />
    </>
  );
}

export { Scene };
