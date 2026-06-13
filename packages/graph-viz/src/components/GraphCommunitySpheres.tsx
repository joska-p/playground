import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { communitySphere } from '../config';
import { useDataStore } from '../stores/dataStore';
import { useUiStore } from '../stores/uiStore';
import { hexToRgb } from '../utils/colors';

type GraphCommunitySpheresProps = {
  ghost?: boolean;
  visibleIds?: Set<number> | null;
  highlightIds?: Set<number> | null;
};

function GraphCommunitySpheres({
  ghost,
  visibleIds,
  highlightIds
}: GraphCommunitySpheresProps) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const dimmedRef = useRef<THREE.InstancedMesh>(null);
  const communities = useDataStore((s) => s.communities);
  const setCommunityFilter = useUiStore((s) => s.setCommunityFilter);
  const setHoveredCommunityId = useUiStore((s) => s.setHoveredCommunityId);

  const communityList = (() => {
    const all = [...communities.values()];
    if (!visibleIds) return all;
    return all.filter((c) => visibleIds.has(c.id));
  })();

  // Split communities into highlighted and dimmed when search is active
  const { highlightedList, dimmedList } = useMemo(() => {
    if (!highlightIds) {
      return { highlightedList: null, dimmedList: null };
    }
    const highlighted: typeof communityList = [];
    const dimmed: typeof communityList = [];
    for (const c of communityList) {
      if (highlightIds.has(c.id)) {
        highlighted.push(c);
      } else {
        dimmed.push(c);
      }
    }
    return { highlightedList: highlighted, dimmedList: dimmed };
  }, [communityList, highlightIds]);

  // Setup highlighted mesh
  useEffect(() => {
    const mesh = ref.current;
    const list = highlightedList ?? communityList;
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
  }, [highlightedList, communityList]);

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
  }, [dimmedList]);

  function handlePointerOver(event: {
    stopPropagation: () => void;
    instanceId?: number;
  }) {
    if (ghost) return;
    event.stopPropagation();
    document.body.style.cursor = 'pointer';
    if (event.instanceId === undefined) return;
    const list = highlightedList ?? communityList;
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
    const list = highlightedList ?? communityList;
    const community = list[event.instanceId];
    if (!community) return;
    setCommunityFilter(String(community.id));
  }

  const highlightedCount = highlightedList?.length ?? communityList.length;
  const dimmedCount = dimmedList?.length ?? 0;

  if (highlightedCount === 0 && dimmedCount === 0) return null;

  return (
    <>
      {/* Highlighted spheres (full opacity) */}
      <instancedMesh
        ref={ref}
        args={[undefined, undefined, highlightedCount]}
        castShadow
        receiveShadow
        onClick={ghost ? undefined : handleClick}
        onPointerOver={ghost ? undefined : handlePointerOver}
        onPointerOut={ghost ? undefined : handlePointerOut}
      >
        <sphereGeometry
          args={[
            communitySphere.radius,
            communitySphere.widthSegments,
            communitySphere.heightSegments
          ]}
        />
        <meshStandardMaterial
          transparent={ghost}
          opacity={ghost ? communitySphere.ghostOpacity : 1}
        />
      </instancedMesh>

      {/* Dimmed spheres (low opacity) — only when search is active */}
      {dimmedCount > 0 && (
        <instancedMesh
          ref={dimmedRef}
          args={[undefined, undefined, dimmedCount]}
          castShadow
          receiveShadow
        >
          <sphereGeometry
            args={[
              communitySphere.radius,
              communitySphere.widthSegments,
              communitySphere.heightSegments
            ]}
          />
          <meshStandardMaterial
            transparent
            opacity={communitySphere.ghostOpacity}
          />
        </instancedMesh>
      )}
    </>
  );
}

export { GraphCommunitySpheres };
