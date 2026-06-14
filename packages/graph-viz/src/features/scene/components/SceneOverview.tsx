import { communityLabel, smartLabel } from '../../../config';
import {
  computeOverviewSearchHighlights,
  computeSmartLabels
} from '../../../utils/searchUtils';
import { useDataStore } from '../../../stores/dataStore';
import { useUiStore } from '../../../stores/uiStore';
import { parseCommunityFilter } from '../../../utils/communities';
import { CommunityLabel } from '../../annotation/components/CommunityLabel';
import { CommunityEdges } from '../../graph/components/CommunityEdges';
import { GraphCommunitySpheres } from '../../graph/components/GraphCommunitySpheres';
import { HyperedgeLayer } from '../../graph/components/HyperedgeLayer';
import { useCameraDistance } from '../hooks/useCameraDistance';

/**
 * Overview mode: renders community spheres, inter-community edges,
 * hyperedge hulls, and distance-aware community labels.
 *
 * Reads all data from stores directly. Camera distance tracked via
 * the useCameraDistance hook for LOD and smart-label fading.
 */
function SceneOverview() {
  const graphData = useDataStore((s) => s.graphData);
  const communities = useDataStore((s) => s.communities);

  const communityFilter = useUiStore((s) => s.communityFilter);
  const minCommunitySize = useUiStore((s) => s.minCommunitySize);
  const showEdges = useUiStore((s) => s.showEdges);
  const searchQuery = useUiStore((s) => s.searchQuery);
  const hoveredCommunityId = useUiStore((s) => s.hoveredCommunityId);

  // ── Camera distance for smart label LOD ──
  const cameraDistance = useCameraDistance();

  // ── Search highlights (which communities match the query) ──
  const searchHighlights = computeOverviewSearchHighlights(
    searchQuery,
    graphData?.nodes ?? [],
    communities
  );

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
  const smartLabelsData = computeSmartLabels(
    communities,
    cameraDistance,
    smartLabel.baseThreshold,
    smartLabel.distanceScale,
    smartLabel.maxLabels,
    visibleCommunityIds ?? undefined
  );

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
          offsetY={hoveredCommunity.radius + communityLabel.hoverOffsetYPad}
        />
      )}
    </>
  );
}

export { SceneOverview };
