import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { communityClustering, communityLOD, communitySphere } from '../config';
import { useDataStore } from '../stores/dataStore';
import { useUiStore } from '../stores/uiStore';
import type { CommunityData } from '../types';
import { hexToRgb } from '../utils/colors';
import { computeOtherCluster } from '../utils/communities';
import type { OtherCluster } from '../utils/communities';

type GraphCommunitySpheresProps = {
  ghost?: boolean;
  visibleIds?: Set<number> | null;
  highlightIds?: Set<number> | null;
  cameraDistance?: number;
};

function getLODSegments(distance: number): [number, number] {
  const levels = communityLOD.levels;
  // Find the best level: last level where distance >= threshold
  let best = levels[levels.length - 1]!;
  for (let i = levels.length - 1; i >= 0; i--) {
    if (distance >= levels[i]!.distance) {
      best = levels[i]!;
      break;
    }
  }
  // Fall through to highest detail if below all thresholds
  for (let i = 0; i < levels.length; i++) {
    if (distance < levels[i]!.distance) {
      best = levels[i]!;
      break;
    }
  }
  return [best.widthSegments, best.heightSegments];
}

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
  const [lodW, lodH] = getLODSegments(cameraDistance);

  // Determine whether clustering is active based on camera distance
  const clusteringActive = !ghost && communityClustering.enabled && cameraDistance > communityClustering.farDistanceThreshold;

  // Split communities into main (shown individually) and other (clustered)
  const { mainCommunities, otherCluster } = (() => {
    if (!clusteringActive) {
      const all = [...communities.values()];
      if (!visibleIds) return { mainCommunities: all, otherCluster: null as OtherCluster | null };
      return {
        mainCommunities: all.filter((c) => visibleIds.has(c.id)),
        otherCluster: null as OtherCluster | null
      };
    }

    // Clustering is active: filter small communities into "other"
    const threshold = communityClustering.smallThreshold;
    const all = [...communities.values()];
    const main: CommunityData[] = [];
    const small: CommunityData[] = [];

    for (const c of all) {
      if (visibleIds && !visibleIds.has(c.id)) continue;
      if (c.nodeCount < threshold) {
        small.push(c);
      } else {
        main.push(c);
      }
    }

    const other = small.length > 0
      ? computeOtherCluster(communities, threshold)
      : null;

    return { mainCommunities: main, otherCluster: other };
  })();

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

  // Setup highlighted mesh
  useEffect(() => {
    const mesh = ref.current;
    const list = highlightedList ?? mainCommunities;
    if (!mesh || list.length === 0) return;

    const dummy = new THREE.Object3D();
    const color = new THREE.Color();

    for (let i = 0; i < list.length; i++) {
      const c = list[i]!;
      const [x, y, z] = c.centroid;
      const s = c.radius;

      dummy.position.set(x, y, z);
      dummy.scale.setScalar(s);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);

      const rgb = hexToRgb(c.color);
      color.setRGB(rgb[0], rgb[1], rgb[2]);
      mesh.setColorAt(i, color);
    }

    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;

    // Compute bounding sphere from actual instance positions
    // so Three.js frustum culling works correctly for this InstancedMesh
    mesh.computeBoundingSphere();
  }, [highlightedList, mainCommunities]);

  // Setup dimmed mesh (only when search is active)
  useEffect(() => {
    const mesh = dimmedRef.current;
    if (!mesh || !dimmedList || dimmedList.length === 0) return;

    const dummy = new THREE.Object3D();
    const color = new THREE.Color();

    for (let i = 0; i < dimmedList.length; i++) {
      const c = dimmedList[i]!;
      const [x, y, z] = c.centroid;
      const s = c.radius;

      dummy.position.set(x, y, z);
      dummy.scale.setScalar(s);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);

      const rgb = hexToRgb(c.color);
      color.setRGB(rgb[0], rgb[1], rgb[2]);
      mesh.setColorAt(i, color);
    }

    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;

    // Compute bounding sphere from actual instance positions
    // so Three.js frustum culling works correctly for this InstancedMesh
    mesh.computeBoundingSphere();
  }, [dimmedList]);

  // Setup "Other" cluster mesh
  useEffect(() => {
    const mesh = otherRef.current;
    if (!mesh || !otherCluster) return;

    const dummy = new THREE.Object3D();
    const color = new THREE.Color();
    const rgb = hexToRgb(communityClustering.otherClusterColor);
    color.setRGB(rgb[0], rgb[1], rgb[2]);

    const [x, y, z] = otherCluster.centroid;
    dummy.position.set(x, y, z);
    dummy.scale.setScalar(otherCluster.radius);
    dummy.updateMatrix();
    mesh.setMatrixAt(0, dummy.matrix);

    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;

    // Compute bounding sphere from actual instance positions
    // so Three.js frustum culling works correctly for this InstancedMesh
    mesh.computeBoundingSphere();
  }, [otherCluster]);

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

  const highlightedCount = highlightedList?.length ?? mainCommunities.length;
  const dimmedCount = dimmedList?.length ?? 0;
  const hasOtherCluster = otherCluster !== null;

  if (highlightedCount === 0 && dimmedCount === 0 && !hasOtherCluster) return null;

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
