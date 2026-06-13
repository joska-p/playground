import { useFrame, useThree } from '@react-three/fiber';
import { useState } from 'react';
import { communityLabel, smartLabel } from '../../config';
import { useDataStore } from '../../stores/dataStore';
import { useUiStore } from '../../stores/uiStore';
import { parseCommunityFilter } from '../../utils/communities';
import { CommunityEdges } from '../graph/CommunityEdges';
import { CommunityLabel } from '../annotation/CommunityLabel';
import { GraphCommunitySpheres } from '../graph/GraphCommunitySpheres';
import { HyperedgeLayer } from '../graph/HyperedgeLayer';

/**
 * Overview mode: renders community spheres, inter-community edges,
 * hyperedge hulls, and distance-aware community labels.
 *
 * Reads all data from stores directly. Self-contained camera distance
 * tracking for LOD and smart-label fading.
 */
function SceneOverview() {
  const graphData = useDataStore((s) => s.graphData);
  const communities = useDataStore((s) => s.communities);
  const { camera } = useThree();

  const communityFilter = useUiStore((s) => s.communityFilter);
  const minCommunitySize = useUiStore((s) => s.minCommunitySize);
  const showEdges = useUiStore((s) => s.showEdges);
  const searchQuery = useUiStore((s) => s.searchQuery);
  const hoveredCommunityId = useUiStore((s) => s.hoveredCommunityId);

  // ── Camera distance for smart label LOD ──
  const [cameraDistance, setCameraDistance] = useState(80);
  useFrame(() => {
    const dist = camera.position.length();
    setCameraDistance((prev) =>
      Math.abs(prev - dist) > smartLabel.cameraUpdateThreshold ? dist : prev
    );
  });

  // ── Search highlights (which communities match the query) ──
  const searchHighlights = (() => {
    if (!searchQuery.trim() || !graphData) return null;
    const q = searchQuery.toLowerCase();

    const matchingNodeIndices = new Set<number>();
    const matchingCommunityIds = new Set<number>();

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

    for (const [cid, comm] of communities) {
      if (comm.label.toLowerCase().includes(q)) {
        matchingCommunityIds.add(cid);
      }
    }

    if (matchingNodeIndices.size === 0 && matchingCommunityIds.size === 0) {
      return null;
    }

    return { matchingCommunityIds };
  })();

  // ── Visible community IDs (filtered + min size) ──
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

  // ── Distance-aware smart labels ──
  const smartLabelsData = (() => {
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

  const hoveredCommunity =
    hoveredCommunityId !== null ? communities.get(hoveredCommunityId) : null;

  return (
    <>
      <GraphCommunitySpheres
        visibleIds={visibleCommunityIds}
        highlightIds={searchHighlights?.matchingCommunityIds}
        cameraDistance={cameraDistance}
      />
      {showEdges && <CommunityEdges visibleIds={visibleCommunityIds} />}

      <HyperedgeLayer />

      {/* Persistent labels for largest communities */}
      {smartLabelsData.map((c) => (
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
          offsetY={
            hoveredCommunity.radius + communityLabel.hoverOffsetYPad
          }
        />
      )}
    </>
  );
}

export { SceneOverview };
