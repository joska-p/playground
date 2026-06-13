import { useRef } from 'react';
import type * as THREE from 'three';
import {
  communityClustering,
  communityLOD,
  communitySphere
} from '../../../config';
import { useDataStore } from '../../../stores/dataStore';
import { useUiStore } from '../../../stores/uiStore';
import { getLODSegments } from '../../scene/services/cameraUtils';
import { useInstanceMesh } from '../hooks/useInstanceMesh';
import { splitCommunitiesForDisplay } from '../services/communityGeometry';

type GraphCommunitySpheresProps = {
  ghost?: boolean;
  visibleIds?: Set<number> | null;
  highlightIds?: Set<number> | null;
  cameraDistance?: number;
};

function GraphCommunitySpheres({
  ghost,
  visibleIds,
  highlightIds,
  cameraDistance = 0
}: GraphCommunitySpheresProps) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const dimmedRef = useRef<THREE.InstancedMesh>(null);
  const otherRef = useRef<THREE.InstancedMesh>(null);
  const communities = useDataStore((s) => s.communities);
  const setCommunityFilter = useUiStore((s) => s.setCommunityFilter);
  const setHoveredCommunityId = useUiStore((s) => s.setHoveredCommunityId);

  // Determine LOD geometry for current camera distance
  const [lodW, lodH] = getLODSegments(cameraDistance, communityLOD.levels);

  // Determine whether clustering is active based on camera distance
  const clusteringActive =
    !ghost &&
    communityClustering.enabled &&
    cameraDistance > communityClustering.farDistanceThreshold;

  // Delegate community splitting to the service
  const { mainCommunities, otherCluster } = splitCommunitiesForDisplay(
    communities,
    clusteringActive,
    cameraDistance,
    communityClustering.farDistanceThreshold,
    communityClustering.smallThreshold,
    visibleIds
  );

  // Split main communities into highlighted and dimmed when search is active
  const { highlightedList, dimmedList } = (() => {
    if (!highlightIds) {
      return { highlightedList: null, dimmedList: null };
    }
    const highlighted: typeof mainCommunities = [];
    const dimmed: typeof mainCommunities = [];
    for (const c of mainCommunities) {
      if (highlightIds.has(c.id)) {
        highlighted.push(c);
      } else {
        dimmed.push(c);
      }
    }
    return { highlightedList: highlighted, dimmedList: dimmed };
  })();

  // Build instance mesh data for highlighted/main spheres
  const displayList = highlightedList ?? mainCommunities;
  const highlightedCount = displayList.length;
  const highlightedPositions = new Float32Array(highlightedCount * 3);
  const highlightedColors: string[] = [];
  const highlightedScales: number[] = [];
  for (let i = 0; i < highlightedCount; i++) {
    const c = displayList[i]!;
    const [x, y, z] = c.centroid;
    highlightedPositions[i * 3] = x;
    highlightedPositions[i * 3 + 1] = y;
    highlightedPositions[i * 3 + 2] = z;
    highlightedScales.push(c.radius);
    highlightedColors.push(c.color);
  }

  // Build instance mesh data for dimmed spheres
  const dimmedCount = dimmedList?.length ?? 0;
  const dimmedPositions = new Float32Array(dimmedCount * 3);
  const dimmedColors: string[] = [];
  const dimmedScales: number[] = [];
  const dimmedIndices: number[] = [];
  if (dimmedList) {
    for (let i = 0; i < dimmedCount; i++) {
      const c = dimmedList[i]!;
      const [x, y, z] = c.centroid;
      dimmedPositions[i * 3] = x;
      dimmedPositions[i * 3 + 1] = y;
      dimmedPositions[i * 3 + 2] = z;
      dimmedScales.push(c.radius);
      dimmedColors.push(c.color);
      dimmedIndices.push(i);
    }
  }

  // Build instance mesh data for "other" cluster sphere
  const hasOtherCluster = otherCluster !== null;
  const otherPositions = new Float32Array(hasOtherCluster ? 3 : 0);
  const otherScales: number[] = [];
  const otherIndices: number[] = [];
  if (otherCluster) {
    const [x, y, z] = otherCluster.centroid;
    otherPositions[0] = x;
    otherPositions[1] = y;
    otherPositions[2] = z;
    otherScales.push(otherCluster.radius);
    otherIndices.push(0);
  }

  // Set up highlighted/main instanced mesh
  useInstanceMesh(ref, {
    positions: highlightedPositions,
    indices: displayList.map((_, i) => i),
    scaleValues: highlightedScales,
    colorValues: highlightedColors
  });

  // Set up dimmed instanced mesh
  useInstanceMesh(dimmedRef, {
    positions: dimmedPositions,
    indices: dimmedIndices,
    scaleValues: dimmedScales,
    colorValues: dimmedColors
  });

  // Set up "other" cluster instanced mesh (no per-instance colors; material color is used)
  useInstanceMesh(otherRef, {
    positions: otherPositions,
    indices: otherIndices,
    scaleValues: otherScales
  });

  function handlePointerOver(event: {
    stopPropagation: () => void;
    instanceId?: number;
  }) {
    if (ghost) return;
    event.stopPropagation();
    document.body.style.cursor = 'pointer';
    if (event.instanceId === undefined) return;
    const list = highlightedList ?? mainCommunities;
    const community = list[event.instanceId];
    if (!community) return;
    setHoveredCommunityId(community.id);
  }

  function handlePointerOut() {
    if (ghost) return;
    document.body.style.cursor = 'auto';
    setHoveredCommunityId(null);
  }

  function handleClick(event: {
    stopPropagation: () => void;
    instanceId?: number;
  }) {
    if (ghost) return;
    event.stopPropagation();
    if (event.instanceId === undefined) return;
    const list = highlightedList ?? mainCommunities;
    const community = list[event.instanceId];
    if (!community) return;
    setCommunityFilter(String(community.id));
  }

  if (highlightedCount === 0 && dimmedCount === 0 && !hasOtherCluster)
    return null;

  return (
    <>
      {/* Highlighted spheres (full opacity) — LOD-adjusted geometry */}
      {highlightedCount > 0 && (
        <instancedMesh
          ref={ref}
          args={[undefined, undefined, highlightedCount]}
          castShadow
          receiveShadow
          onClick={ghost ? undefined : handleClick}
          onPointerOver={ghost ? undefined : handlePointerOver}
          onPointerOut={ghost ? undefined : handlePointerOut}
        >
          <sphereGeometry args={[communitySphere.radius, lodW, lodH]} />
          <meshStandardMaterial
            transparent={ghost}
            opacity={ghost ? communitySphere.ghostOpacity : 1}
          />
        </instancedMesh>
      )}

      {/* Dimmed spheres (low opacity) — only when search is active */}
      {dimmedCount > 0 && (
        <instancedMesh
          ref={dimmedRef}
          args={[undefined, undefined, dimmedCount]}
          castShadow
          receiveShadow
        >
          <sphereGeometry args={[communitySphere.radius, lodW, lodH]} />
          <meshStandardMaterial
            transparent
            opacity={communitySphere.ghostOpacity}
          />
        </instancedMesh>
      )}

      {/* "Other" cluster sphere — rendered when clustering is active */}
      {hasOtherCluster && (
        <instancedMesh
          ref={otherRef}
          args={[undefined, undefined, 1]}
          castShadow
          receiveShadow
        >
          <sphereGeometry args={[communitySphere.radius, lodW, lodH]} />
          <meshStandardMaterial
            color={communityClustering.otherClusterColor}
            transparent
            opacity={0.5}
          />
        </instancedMesh>
      )}
    </>
  );
}

export { GraphCommunitySpheres };
