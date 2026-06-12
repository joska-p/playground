import { useRef, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import type {} from '@react-three/fiber';
import { useDataStore } from '../stores/dataStore';
import { useUiStore } from '../stores/uiStore';
import { hexToRgb } from '../utils/colors';

type GraphCommunitySpheresProps = {
  ghost?: boolean;
  visibleIds?: Set<number> | null;
};

function GraphCommunitySpheres({ ghost, visibleIds }: GraphCommunitySpheresProps) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const communities = useDataStore((s) => s.communities);
  const communityFilter = useUiStore((s) => s.communityFilter);
  const setCommunityFilter = useUiStore((s) => s.setCommunityFilter);

  // Derive whether a community is currently selected
  const hasSelection = useMemo(() => {
    const trimmed = communityFilter.trim();
    return /^\d+$/.test(trimmed);
  }, [communityFilter]);

  const communityList = useMemo(() => {
    const all = [...communities.values()];
    if (!visibleIds) return all;
    return all.filter((c) => visibleIds.has(c.id));
  }, [communities, visibleIds]);

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

  function handleClick(event: { stopPropagation: () => void; instanceId?: number }) {
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
      args={[null, null, communityList.length]}
      onClick={handleClick}
    >
      <sphereGeometry args={[1, 16, 12]} />
      <meshStandardMaterial
        transparent
        opacity={ghost ? 0.12 : hasSelection ? 0.4 : 0.7}
        depthWrite={false}
      />
    </instancedMesh>
  );
}

export { GraphCommunitySpheres };
