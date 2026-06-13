import { ContactShadows, OrbitControls } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {
  camera as cameraConfig,
  communityLabel,
  contactShadow,
  controls,
  detailView,
  fillLight,
  fog,
  hemisphereLight,
  keyLight,
  nodes as nodeConfig,
  nodeLabel,
  rimLight,
  smartLabel
} from '../config';
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
import { NodeTypeIndicators } from './NodeTypeIndicators';

function Scene() {
  const controlsRef = useRef<React.ComponentRef<typeof OrbitControls>>(null);
  const cameraState = useRef<'default' | 'detail' | 'overview'>('default');
  const lastDetailCommunityRef = useRef<number | null>(null);
  const flyAnimation = useRef<{
    active: boolean;
    startPos: THREE.Vector3;
    endPos: THREE.Vector3;
    startTarget: THREE.Vector3;
    endTarget: THREE.Vector3;
    progress: number;
    duration: number;
  } | null>(null);
  const [flyActive, setFlyActive] = useState(false);

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
  const searchQuery = useUiStore((s) => s.searchQuery);

  // Derive view mode from communityFilter — single numeric ID = detail mode
  const selectedCommunityId = (() => {
    const trimmed = communityFilter.trim();
    return /^\d+$/.test(trimmed) ? Number.parseInt(trimmed, 10) : null;
  })();
  const viewMode = selectedCommunityId !== null ? 'detail' : 'overview';

  // Derive search highlights from searchQuery
  const searchHighlights = (() => {
    if (!searchQuery.trim() || !graphData) return null;
    const q = searchQuery.toLowerCase();

    const matchingNodeIndices = new Set<number>();
    const matchingCommunityIds = new Set<number>();

    // Match against nodes
    for (let i = 0; i < graphData.nodes.length; i++) {
      const node = graphData.nodes[i]!;
      if (
        node.label.toLowerCase().includes(q) ||
        node.id.toLowerCase().includes(q)
      ) {
        matchingNodeIndices.add(i);
        matchingCommunityIds.add(node.community);
      }
    }

    // Match against communities
    for (const [cid, comm] of communities) {
      if (comm.label.toLowerCase().includes(q)) {
        matchingCommunityIds.add(cid);
      }
    }

    return { matchingNodeIndices, matchingCommunityIds };
  })();

  // Communities to show in overview mode
  const visibleCommunityIds = (() => {
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
  })();

  // Camera distance tracking for smart labels
  const [cameraDistance, setCameraDistance] = useState(80);
  const camera = useThree((s) => s.camera);

  useFrame((_, delta) => {
    // Camera distance tracking for smart labels
    const dist = camera.position.length();
    setCameraDistance((prev) =>
      Math.abs(prev - dist) > smartLabel.cameraUpdateThreshold ? dist : prev
    );

    // Fly animation
    if (!flyAnimation.current?.active || !controlsRef.current) return;
    const anim = flyAnimation.current;
    anim.progress += delta * 1000; // delta is in seconds, convert to ms

    const t = Math.min(anim.progress / anim.duration, 1);
    // Ease-out cubic for natural deceleration
    const ease = 1 - Math.pow(1 - t, 3);

    camera.position.lerpVectors(anim.startPos, anim.endPos, ease);
    controlsRef.current.target.lerpVectors(anim.startTarget, anim.endTarget, ease);
    controlsRef.current.update();

    if (t >= 1) {
      anim.active = false;
      setFlyActive(false);
      cameraState.current = selectedCommunityId !== null ? 'detail' : 'overview';
    }
  });

  // Distance-aware community labels — more labels as camera zooms in
  const smartLabels = (() => {
    if (viewMode !== 'overview') return [];
    const threshold =
      smartLabel.baseThreshold *
      (1 + cameraDistance / smartLabel.distanceScale);
    return [...communities.values()]
      .filter((c) => {
        if (!visibleCommunityIds) return c.nodeCount >= threshold;
        return visibleCommunityIds.has(c.id) && c.nodeCount >= threshold;
      })
      .sort((a, b) => b.nodeCount - a.nodeCount)
      .slice(0, smartLabel.maxLabels);
  })();

  // Hovered community for label
  const hoveredCommunity =
    hoveredCommunityId !== null ? communities.get(hoveredCommunityId) : null;

  // Animate camera fly-to when returning to overview
  useEffect(() => {
    if (!controlsRef.current || viewMode !== 'overview') return;
    if (cameraState.current === 'overview') return;

    setFlyActive(true);
    flyAnimation.current = {
      active: true,
      startPos: camera.position.clone(),
      endPos: new THREE.Vector3(
        cameraConfig.overviewPosition[0],
        cameraConfig.overviewPosition[1],
        cameraConfig.overviewPosition[2]
      ),
      startTarget: controlsRef.current.target.clone(),
      endTarget: new THREE.Vector3(0, 0, 0),
      progress: 0,
      duration: cameraConfig.flyDuration
    };
    lastDetailCommunityRef.current = null;
  }, [viewMode, camera]);

  // Filtered data for detail view — positions normalized to compact volume
  const MAX_SPREAD = detailView.maxSpread;
  const detailData = (() => {
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
      positions: normalizeCommunityPositions(filtered.positions, MAX_SPREAD)
    };
  })();

  // Animate camera fly-to when entering detail mode
  useEffect(() => {
    if (!controlsRef.current || selectedCommunityId === null || !detailData)
      return;
    if (lastDetailCommunityRef.current === selectedCommunityId) return;
    lastDetailCommunityRef.current = selectedCommunityId;

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
    const spread = Math.max(
      maxX - minX,
      maxY - minY,
      maxZ - minZ,
      cameraConfig.detailMinSpread
    );
    const distance = Math.max(
      spread * cameraConfig.detailSpreadMultiplier,
      cameraConfig.detailMinDistance
    );

    setFlyActive(true);
    flyAnimation.current = {
      active: true,
      startPos: camera.position.clone(),
      endPos: new THREE.Vector3(
        distance * cameraConfig.detailXRatio,
        distance * cameraConfig.detailYRatio,
        distance
      ),
      startTarget: controlsRef.current.target.clone(),
      endTarget: new THREE.Vector3(0, 0, 0),
      progress: 0,
      duration: cameraConfig.flyDuration
    };
  }, [selectedCommunityId, camera, detailData]);

  // Hovered node for label display
  const hoveredNode = (() => {
    if (hoveredNodeIndex === null || !detailData) return null;
    return detailData.nodes[hoveredNodeIndex] ?? null;
  })();

  // Position of hovered node
  const hoveredNodePos = ((): [number, number, number] | null => {
    if (hoveredNodeIndex === null || !detailData) return null;
    const i = hoveredNodeIndex;
    const pos = detailData.positions;
    return [pos[i * 3]!, pos[i * 3 + 1]!, pos[i * 3 + 2]!];
  })();

  // Connected node IDs → local indices for highlighting
  const connectedNodeIds = (() => {
    if (!selectedNode || !detailData) return new Set<string>();
    const ids = new Set<string>();
    ids.add(selectedNode.id);
    for (const link of detailData.links) {
      if (link.source === selectedNode.id) ids.add(link.target);
      if (link.target === selectedNode.id) ids.add(link.source);
    }
    return ids;
  })();

  const connectedNodeIndices = (() => {
    if (!selectedNode || !detailData) return new Set<number>();
    const indices = new Set<number>();
    for (let i = 0; i < detailData.nodes.length; i++) {
      if (connectedNodeIds.has(detailData.nodes[i]!.id)) {
        indices.add(i);
      }
    }
    return indices;
  })();

  // Map search highlights to detail data indices
  const searchHighlightIndicesInDetail = (() => {
    if (!searchHighlights || !detailData) return null;
    const indices = new Set<number>();
    for (let i = 0; i < detailData.nodes.length; i++) {
      const globalIdx = graphData!.nodes.indexOf(detailData.nodes[i]!);
      if (globalIdx !== -1 && searchHighlights.matchingNodeIndices.has(globalIdx)) {
        indices.add(i);
      }
    }
    return indices.size > 0 ? indices : null;
  })();

  // Position of selected node
  const selectedNodePos = ((): [number, number, number] | null => {
    if (!selectedNode || !detailData) return null;
    const idx = detailData.nodes.indexOf(selectedNode);
    if (idx === -1) return null;
    return [
      detailData.positions[idx * 3],
      detailData.positions[idx * 3 + 1],
      detailData.positions[idx * 3 + 2]
    ];
  })();

  if (!positions || !graphData) return null;

  return (
    <>
      {/* Fog for depth perception */}
      <fog
        attach="fog"
        args={[fog.color, fog.near, fog.far]}
      />

      {/* Ambient fill from sky/ground */}
      <hemisphereLight
        args={[
          hemisphereLight.skyColor,
          hemisphereLight.groundColor,
          hemisphereLight.intensity
        ]}
      />

      {/* Main key light — casts shadows */}
      <directionalLight
        position={keyLight.position}
        intensity={keyLight.intensity}
        castShadow
        shadow-mapSize-width={keyLight.shadowMapSize}
        shadow-mapSize-height={keyLight.shadowMapSize}
        shadow-camera-far={keyLight.shadowCameraFar}
        shadow-camera-left={keyLight.shadowCameraLeft}
        shadow-camera-right={keyLight.shadowCameraRight}
        shadow-camera-top={keyLight.shadowCameraTop}
        shadow-camera-bottom={keyLight.shadowCameraBottom}
      />

      {/* Cool fill light from opposite side */}
      <directionalLight
        position={fillLight.position}
        intensity={fillLight.intensity}
      />

      {/* Subtle rim light from behind */}
      <directionalLight
        position={rimLight.position}
        intensity={rimLight.intensity}
      />

      {/* Soft contact shadow beneath the graph */}
      <ContactShadows
        position={contactShadow.position}
        opacity={contactShadow.opacity}
        scale={contactShadow.scale}
        blur={contactShadow.blur}
        far={contactShadow.far}
      />

      <OrbitControls
        ref={controlsRef}
        enableDamping
        dampingFactor={controls.dampingFactor}
        autoRotate={!flyActive && autoRotate}
        autoRotateSpeed={controls.autoRotateSpeed}
        minDistance={controls.minDistance}
        maxDistance={controls.maxDistance}
        enabled={!flyActive}
      />

      {/* Overview mode */}
      {viewMode === 'overview' && (
        <>
          <GraphCommunitySpheres
            visibleIds={visibleCommunityIds}
            highlightIds={searchHighlights?.matchingCommunityIds}
          />
          {showEdges && <CommunityEdges visibleIds={visibleCommunityIds} />}

          {/* Persistent labels for largest communities */}
          {smartLabels.map((c) => (
            <CommunityLabel
              key={`label-${c.id}`}
              label={c.label}
              position={c.centroid}
              fontSize={Math.min(
                communityLabel.fontSizeMax,
                communityLabel.fontSizeBase +
                  Math.cbrt(c.nodeCount) * communityLabel.fontSizeScale
              )}
              offsetY={c.radius + communityLabel.defaultOffsetY - 0.5}
            />
          ))}

          {/* Hover label — richer info, only when hovering */}
          {hoveredCommunity && (
            <CommunityLabel
              key={`hover-label-${hoveredCommunity.id}`}
              label={`${hoveredCommunity.label} (${hoveredCommunity.nodeCount})`}
              position={hoveredCommunity.centroid}
              fontSize={communityLabel.hoverFontSize}
              color="#ffd166"
              offsetY={hoveredCommunity.radius + communityLabel.hoverOffsetYPad}
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
            size={nodeConfig.defaultSize}
            highlightIndices={
              searchHighlightIndicesInDetail ?? connectedNodeIndices
            }
            onNodeClick={selectNode}
            onPointerMoveNode={setHoveredNodeIndex}
          />
          <NodeTypeIndicators
            positions={detailData.positions}
            nodes={detailData.nodes}
            degrees={detailData.degrees}
            size={nodeConfig.defaultSize}
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
              fontSize={nodeLabel.selectedFontSize}
              color="#ffd166"
            />
          )}
          {hoveredNode && hoveredNodePos && (
            <NodeLabel
              node={hoveredNode}
              position={hoveredNodePos}
              fontSize={nodeLabel.hoveredFontSize}
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
                  fontSize={nodeLabel.defaultFontSize}
                />
              );
            })}
        </>
      )}
    </>
  );
}

export { Scene };
