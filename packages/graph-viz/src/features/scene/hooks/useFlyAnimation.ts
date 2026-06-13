import type { OrbitControls } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import { useDataStore } from '../../../stores/dataStore';
import { useUiStore } from '../../../stores/uiStore';
import {
  createDetailFlyAnimation,
  createOverviewFlyAnimation,
  tickFlyAnimation,
  type FlyAnimation
} from '../services/cameraUtils';

type CameraState = 'default' | 'detail' | 'overview';

/**
 * Manages fly-to camera animation between overview and detail views.
 * Reads view mode from communityFilter and selectedCommunityId to trigger transitions.
 * Self-contained — reads autoRotate from uiStore.
 *
 * Returns the current fly animation state and OrbitControls props
 * (autoRotate, enabled) that respect the animation.
 */
export function useFlyAnimation(selectedCommunityId: number | null) {
  const controlsRef = useRef<React.ComponentRef<typeof OrbitControls>>(null);
  const cameraStateRef = useRef<CameraState>('default');
  const lastDetailCommunityRef = useRef<number | null>(null);
  const flyAnimationRef = useRef<FlyAnimation | null>(null);
  const pendingAnimationRef = useRef(false);
  const [flyActive, setFlyActive] = useState(false);

  const { camera } = useThree();
  const autoRotate = useUiStore((s) => s.autoRotate);
  const communities = useDataStore((s) => s.communities);

  const viewMode = selectedCommunityId !== null ? 'detail' : 'overview';

  // ── Fly animation tick ──
  useFrame((_, delta) => {
    // Pick up any pending animation request (defers setState from effects)
    if (pendingAnimationRef.current) {
      pendingAnimationRef.current = false;
      setFlyActive(true);
    }

    const anim = flyAnimationRef.current;
    if (!anim?.active || !controlsRef.current) return;

    const updated = tickFlyAnimation(
      anim,
      delta * 1000,
      camera,
      controlsRef.current.target
    );
    flyAnimationRef.current = updated;
    controlsRef.current.update();

    if (!updated.active) {
      setFlyActive(false);
      cameraStateRef.current = viewMode === 'detail' ? 'detail' : 'overview';
    }
  });

  // ── Fly-to overview ──
  useEffect(() => {
    if (!controlsRef.current || viewMode !== 'overview') return;
    if (cameraStateRef.current === 'overview') return;

    pendingAnimationRef.current = true;
    flyAnimationRef.current = createOverviewFlyAnimation(
      camera,
      controlsRef.current.target
    );
    lastDetailCommunityRef.current = null;
  }, [viewMode, camera]);

  // ── Fly-to detail ──
  useEffect(() => {
    if (!controlsRef.current || selectedCommunityId === null) return;
    if (lastDetailCommunityRef.current === selectedCommunityId) return;
    lastDetailCommunityRef.current = selectedCommunityId;

    const community = communities.get(selectedCommunityId);
    if (!community) return;

    pendingAnimationRef.current = true;
    flyAnimationRef.current = createDetailFlyAnimation(
      camera,
      controlsRef.current.target,
      community
    );
  }, [selectedCommunityId, camera, communities]);

  return {
    controlsRef,
    flyActive,
    autoRotate,
    controlsEnabled: !flyActive
  };
}
