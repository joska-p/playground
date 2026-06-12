import { OrbitControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import { useDataStore } from '../stores/dataStore';
import { useUiStore } from '../stores/uiStore';
import {
  filterByCommunity,
  normalizeCommunityPositions,
  parseCommunityFilter
} from '../utils/communities';
import { CommunityEdges } from './CommunityEdges';
import { CommunityLabel } from './CommunityLabel';
import { CommunityLinks } from './CommunityLinks';
import { GraphCommunitySpheres } from './GraphCommunitySpheres';
import { GraphEdges } from './GraphEdges';
import { GraphNodes } from './GraphNodes';
import { HighlightedEdges } from './HighlightedEdges';
import { NodeLabel } from './NodeLabel';

function Scene() {
  const controlsRef = useRef<React.ComponentRef<typeof OrbitControls>>(null);
  const cameraState = useRef<'default' | 'detail' | 'overview'>('default');
  const camera = useThree((s) => s.camera);

  const graphData = useDataStore((s) => s.graphData);
  const positions = useDataStore((s) => s.positions);
  const degrees = useDataStore((s) => s.degrees);
  const communities = useDataStore((s) => s.communities);

  const communityFilter = useUiStore((s) => s.communityFilter);
  const minCommunitySize = useUiStore((s) => s.minCommunitySize);
  const autoRotate = useUiStore((s) => s.autoRotate);
  const showEdges = useUiStore((s) => s.showEdges);
  const showNodeLabels = useUiStore((s) => s.showNodeLabels);
  const hoveredCommunityId = useUiStore((s) => s.hoveredCommunityId);
  const hoveredNodeIndex = useUiStore((s) => s.hoveredNodeIndex);
  const selectedNode = useUiStore((s) => s.selectedNode);
  const selectNode = useUiStore((s) => s.selectNode);
  const setHoveredNodeIndex = useUiStore((s) => s.setHoveredNodeIndex);

  // Derive view mode from communityFilter — single numeric ID = detail mode
  const selectedCommunityId = useMemo(() => {
    const trimmed = communityFilter.trim();
    return /^\d+$/.test(trimmed) ? Number.parseInt(trimmed, 10) : null;
  }, [communityFilter]);
  const viewMode = selectedCommunityId !== null ? 'detail' : 'overview';

  // Communities to show in overview mode
  const visibleCommunityIds = useMemo(() => {
    const filterIds = parseCommunityFilter(communityFilter);
    if (filterIds) return filterIds;
    if (minCommunitySize > 1) {
      return new Set(
        [...communities.values()]
          .filter((c) => c.nodeCount >= minCommunitySize)
          .map((c) => c.id)
      );
    }
    return null;
  }, [communityFilter, minCommunitySize, communities]);

  // Top communities for persistent labels (overview only)
  const topLabels = useMemo(() => {
    if (viewMode !== 'overview') return [];
    return [...communities.values()]
      .filter((c) => {
        if (!visibleCommunityIds) return c.nodeCount >= 10;
        return visibleCommunityIds.has(c.id) && c.nodeCount >= 10;
      })
      .sort((a, b) => b.nodeCount - a.nodeCount)
      .slice(0, 25);
  }, [communities, viewMode, visibleCommunityIds]);

  // Hovered community for label
  const hoveredCommunity =
    hoveredCommunityId !== null ? communities.get(hoveredCommunityId) : null;

  // Reset camera when going back to overview
  useEffect(() => {
    if (!controlsRef.current || viewMode !== 'overview') return;
    if (cameraState.current === 'overview') return;
    camera.position.set(50, 40, 60);
    controlsRef.current.target.set(0, 0, 0);
    controlsRef.current.update();
    cameraState.current = 'overview';
  }, [viewMode, camera]);

  // Filtered data for detail view — positions normalized to compact volume
  const COMMUNITY_MAX_SPREAD = 15;
  const detailData = useMemo(() => {
    if (
      viewMode !== 'detail' ||
      selectedCommunityId === null ||
      !graphData ||
      !positions
    ) {
      return null;
    }
    const filtered = filterByCommunity(
      selectedCommunityId,
      positions,
      graphData.nodes,
      graphData.links,
      degrees ?? undefined
    );
    if (!filtered) return null;
    return {
      ...filtered,
      positions: normalizeCommunityPositions(
        filtered.positions,
        COMMUNITY_MAX_SPREAD
      )
    };
  }, [viewMode, selectedCommunityId, graphData, positions, degrees]);

  // Fly camera to community — distance proportional to actual spread
  useEffect(() => {
    if (!controlsRef.current || selectedCommunityId === null || !detailData)
      return;

    const pos = detailData.positions;
    const n = pos.length / 3;
    let minX = Infinity,
      maxX = -Infinity;
    let minY = Infinity,
      maxY = -Infinity;
    let minZ = Infinity,
      maxZ = -Infinity;
    for (let i = 0; i < n; i++) {
      const x = pos[i * 3]!;
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      const y = pos[i * 3 + 1]!;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
      const z = pos[i * 3 + 2]!;
      if (z < minZ) minZ = z;
      if (z > maxZ) maxZ = z;
    }
    const spread = Math.max(maxX - minX, maxY - minY, maxZ - minZ, 0.1);
    const distance = Math.max(spread * 1.5, 8);

    camera.position.set(distance * 0.6, distance * 0.4, distance);
    controlsRef.current.target.set(0, 0, 0);
    controlsRef.current.update();
    cameraState.current = 'detail';
  }, [selectedCommunityId, camera, detailData]);

  // Hovered node for label display
  const hoveredNode = useMemo(() => {
    if (hoveredNodeIndex === null || !detailData) return null;
    return detailData.nodes[hoveredNodeIndex] ?? null;
  }, [hoveredNodeIndex, detailData]);

  // Position of hovered node
  const hoveredNodePos = useMemo((): [number, number, number] | null => {
    if (hoveredNodeIndex === null || !detailData) return null;
    const i = hoveredNodeIndex;
    const pos = detailData.positions;
    return [pos[i * 3]!, pos[i * 3 + 1]!, pos[i * 3 + 2]!];
  }, [hoveredNodeIndex, detailData]);

  // Connected node IDs → local indices for highlighting
  const connectedNodeIds = useMemo(() => {
    if (!selectedNode || !detailData) return new Set<string>();
    const ids = new Set<string>();
    ids.add(selectedNode.id);
    for (const link of detailData.links) {
      if (link.source === selectedNode.id) ids.add(link.target);
      if (link.target === selectedNode.id) ids.add(link.source);
    }
    return ids;
  }, [selectedNode, detailData]);

  const connectedNodeIndices = useMemo(() => {
    if (!selectedNode || !detailData) return new Set<number>();
    const indices = new Set<number>();
    for (let i = 0; i < detailData.nodes.length; i++) {
      if (connectedNodeIds.has(detailData.nodes[i]!.id)) {
        indices.add(i);
      }
    }
    return indices;
  }, [connectedNodeIds, detailData]);

  // Position of selected node
  const selectedNodePos = useMemo((): [number, number, number] | null => {
    if (!selectedNode || !detailData) return null;
    const idx = detailData.nodes.indexOf(selectedNode);
    if (idx === -1) return null;
    return [
      detailData.positions[idx * 3],
      detailData.positions[idx * 3 + 1],
      detailData.positions[idx * 3 + 2]
    ];
  }, [selectedNode, detailData]);

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

          {/* Persistent labels for largest communities */}
          {topLabels.map((c) => (
            <CommunityLabel
              key={`label-${c.id}`}
              label={c.label}
              position={c.centroid}
              fontSize={Math.min(3, 0.6 + Math.cbrt(c.nodeCount) * 0.4)}
              offsetY={c.radius + 1.5}
            />
          ))}

          {/* Hover label — richer info, only when hovering */}
          {hoveredCommunity && (
            <CommunityLabel
              key={`hover-label-${hoveredCommunity.id}`}
              label={`${hoveredCommunity.label} (${hoveredCommunity.nodeCount})`}
              position={hoveredCommunity.centroid}
              fontSize={2.5}
              color="#ffd166"
              offsetY={hoveredCommunity.radius + 4}
            />
          )}
        </>
      )}

      {/* Detail mode */}
      {viewMode === 'detail' && detailData && (
        <>
          <GraphCommunitySpheres ghost />
          <GraphNodes
            positions={detailData.positions}
            nodes={detailData.nodes}
            degrees={detailData.degrees}
            size={6}
            opacity={1}
            highlightIndices={connectedNodeIndices}
            onNodeClick={selectNode}
            onPointerMoveNode={setHoveredNodeIndex}
          />
          {showEdges && (
            <GraphEdges
              positions={detailData.positions}
              links={detailData.links}
              nodeIndex={detailData.nodeIndex}
            />
          )}

          {/* Highlighted edges for selected node */}
          {selectedNode && (
            <HighlightedEdges
              positions={detailData.positions}
              links={detailData.links}
              nodeIndex={detailData.nodeIndex}
              selectedNodeId={selectedNode.id}
            />
          )}

          {/* Cross-community links */}
          <CommunityLinks selectedCommunityId={selectedCommunityId!} />

          {/* Node labels: always show for selected + hovered */}
          {selectedNode && selectedNodePos && (
            <NodeLabel
              node={selectedNode}
              position={selectedNodePos}
              fontSize={0.9}
              color="#ffd166"
            />
          )}
          {hoveredNode && hoveredNodePos && (
            <NodeLabel
              node={hoveredNode}
              position={hoveredNodePos}
              fontSize={0.7}
              color="#ffffff"
            />
          )}

          {/* If showNodeLabels toggle is on, render all */}
          {showNodeLabels &&
            detailData.nodes.map((node, i) => {
              // Skip if already shown as hovered/selected
              if (
                (hoveredNode && node.id === hoveredNode.id) ||
                (selectedNode && node.id === selectedNode.id)
              ) {
                return null;
              }
              const pos = detailData.positions;
              return (
                <NodeLabel
                  key={`node-label-${node.id}`}
                  node={node}
                  position={[pos[i * 3]!, pos[i * 3 + 1]!, pos[i * 3 + 2]!]}
                  fontSize={0.5}
                />
              );
            })}
        </>
      )}
    </>
  );
}

export { Scene };
