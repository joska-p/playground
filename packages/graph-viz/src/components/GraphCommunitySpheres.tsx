import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { communitySphere } from '../config';
import { useDataStore } from '../stores/dataStore';
import { useUiStore } from '../stores/uiStore';
import { hexToRgb } from '../utils/colors';

type GraphCommunitySpheresProps = {
  ghost?: boolean;
  visibleIds?: Set<number> | null;
};

function GraphCommunitySpheres({
  ghost,
  visibleIds
}: GraphCommunitySpheresProps) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const communities = useDataStore((s) => s.communities);
  const setCommunityFilter = useUiStore((s) => s.setCommunityFilter);
  const setHoveredCommunityId = useUiStore((s) => s.setHoveredCommunityId);

  const communityList = (() => {
    const all = [...communities.values()];
    if (!visibleIds) return all;
    return all.filter((c) => visibleIds.has(c.id));
  })();

  useEffect(() => {
    const mesh = ref.current;
    if (!mesh || communityList.length === 0) return;

    const dummy = new THREE.Object3D();
    const color = new THREE.Color();

    for (let i = 0; i < communityList.length; i++) {
      const c = communityList[i]!;
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
  }, [communityList]);

  function handlePointerOver(event: {
    stopPropagation: () => void;
    instanceId?: number;
  }) {
    if (ghost) return;
    event.stopPropagation();
    document.body.style.cursor = 'pointer';
    if (event.instanceId === undefined) return;
    const community = communityList[event.instanceId];
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
    const community = communityList[event.instanceId];
    if (!community) return;
    setCommunityFilter(String(community.id));
  }

  if (communityList.length === 0) return null;

  return (
    <instancedMesh
      ref={ref}
      args={[undefined, undefined, communityList.length]}
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
  );
}

export { GraphCommunitySpheres };
