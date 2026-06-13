import { OrbitControls } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { camera as cameraConfig, controls } from '../../config';
import { useDataStore } from '../../stores/dataStore';
import { useUiStore } from '../../stores/uiStore';

type FlyAnimation = {
  active: boolean;
  startPos: THREE.Vector3;
  endPos: THREE.Vector3;
  startTarget: THREE.Vector3;
  endTarget: THREE.Vector3;
  progress: number;
  duration: number;
};

type CameraControllerProps = {
  selectedCommunityId: number | null;
};

/**
 * OrbitControls + fly-to animation between overview and detail views.
 *
 * Reads view mode from communityFilter to trigger smooth camera transitions.
 * Uses precomputed `spread` on CommunityData (from Phase 0) for detail zoom.
 * Self-contained — reads autoRotate and communityFilter from stores.
 */
function CameraController({ selectedCommunityId }: CameraControllerProps) {
  const controlsRef = useRef<React.ComponentRef<typeof OrbitControls>>(null);
  const cameraStateRef = useRef<'default' | 'detail' | 'overview'>('default');
  const lastDetailCommunityRef = useRef<number | null>(null);
  const flyAnimationRef = useRef<FlyAnimation | null>(null);
  const [flyActive, setFlyActive] = useState(false);

  const { camera } = useThree();
  const autoRotate = useUiStore((s) => s.autoRotate);
  const communities = useDataStore((s) => s.communities);

  const viewMode = selectedCommunityId !== null ? 'detail' : 'overview';

  // ── Fly animation tick ──
  useFrame((_, delta) => {
    if (!flyAnimationRef.current?.active || !controlsRef.current) return;
    const anim = flyAnimationRef.current;
    anim.progress += delta * 1000;

    const t = Math.min(anim.progress / anim.duration, 1);
    const ease = 1 - Math.pow(1 - t, 3); // ease-out cubic

    camera.position.lerpVectors(anim.startPos, anim.endPos, ease);
    controlsRef.current.target.lerpVectors(
      anim.startTarget,
      anim.endTarget,
      ease
    );
    controlsRef.current.update();

    if (t >= 1) {
      anim.active = false;
      setFlyActive(false);
      cameraStateRef.current =
        selectedCommunityId !== null ? 'detail' : 'overview';
    }
  });

  // ── Fly-to overview ──
  useEffect(() => {
    if (!controlsRef.current || viewMode !== 'overview') return;
    if (cameraStateRef.current === 'overview') return;

    setFlyActive(true);
    flyAnimationRef.current = {
      active: true,
      startPos: camera.position.clone(),
      endPos: new THREE.Vector3(...cameraConfig.overviewPosition),
      startTarget: controlsRef.current.target.clone(),
      endTarget: new THREE.Vector3(0, 0, 0),
      progress: 0,
      duration: cameraConfig.flyDuration
    };
    lastDetailCommunityRef.current = null;
  }, [viewMode, camera]);

  // ── Fly-to detail ──
  useEffect(() => {
    if (
      !controlsRef.current ||
      selectedCommunityId === null
    )
      return;
    if (lastDetailCommunityRef.current === selectedCommunityId) return;
    lastDetailCommunityRef.current = selectedCommunityId;

    const community = communities.get(selectedCommunityId);
    if (!community) return;

    const spread = Math.max(community.spread, cameraConfig.detailMinSpread);
    const distance = Math.max(
      spread * cameraConfig.detailSpreadMultiplier,
      cameraConfig.detailMinDistance
    );

    setFlyActive(true);
    flyAnimationRef.current = {
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
  }, [selectedCommunityId, camera, communities]);

  return (
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
  );
}

export { CameraController };
