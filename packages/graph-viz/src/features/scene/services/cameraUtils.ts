import * as THREE from 'three';
import { camera as cameraConfig } from '../../../config';
import type { CommunityData } from '../../../types';

export type FlyAnimation = {
  active: boolean;
  startPos: THREE.Vector3;
  endPos: THREE.Vector3;
  startTarget: THREE.Vector3;
  endTarget: THREE.Vector3;
  progress: number;
  duration: number;
};

/**
 * Create a fly animation from current camera state to the overview position.
 */
export function createOverviewFlyAnimation(
  camera: THREE.Camera,
  controlsTarget: THREE.Vector3
): FlyAnimation {
  return {
    active: true,
    startPos: camera.position.clone(),
    endPos: new THREE.Vector3(...cameraConfig.overviewPosition),
    startTarget: controlsTarget.clone(),
    endTarget: new THREE.Vector3(0, 0, 0),
    progress: 0,
    duration: cameraConfig.flyDuration,
  };
}

/**
 * Create a fly animation from current camera state to a detail view
 * of a specific community. Distance is derived from the community's spread.
 */
export function createDetailFlyAnimation(
  camera: THREE.Camera,
  controlsTarget: THREE.Vector3,
  community: CommunityData
): FlyAnimation {
  const spread = Math.max(community.spread, cameraConfig.detailMinSpread);
  const distance = Math.max(
    spread * cameraConfig.detailSpreadMultiplier,
    cameraConfig.detailMinDistance
  );

  return {
    active: true,
    startPos: camera.position.clone(),
    endPos: new THREE.Vector3(
      distance * cameraConfig.detailXRatio,
      distance * cameraConfig.detailYRatio,
      distance
    ),
    startTarget: controlsTarget.clone(),
    endTarget: new THREE.Vector3(0, 0, 0),
    progress: 0,
    duration: cameraConfig.flyDuration,
  };
}

/**
 * Tick a fly animation by delta (ms). Applies ease-out cubic interpolation.
 * Returns the updated animation; check `anim.active` to know if it completed.
 */
export function tickFlyAnimation(
  anim: FlyAnimation,
  deltaMs: number,
  camera: THREE.Camera,
  controlsTarget: THREE.Vector3
): FlyAnimation {
  if (!anim.active) return anim;

  const newProgress = anim.progress + deltaMs;
  const t = Math.min(newProgress / anim.duration, 1);
  const ease = 1 - Math.pow(1 - t, 3); // ease-out cubic

  camera.position.lerpVectors(anim.startPos, anim.endPos, ease);
  controlsTarget.lerpVectors(anim.startTarget, anim.endTarget, ease);

  return {
    ...anim,
    progress: newProgress,
    active: t < 1,
  };
}

/**
 * Compute LOD geometry segments for community spheres based on camera distance.
 */
export function getLODSegments(
  distance: number,
  levels: ReadonlyArray<{ distance: number; widthSegments: number; heightSegments: number }>
): [number, number] {
  let best = levels[levels.length - 1]!;

  // Find best level: highest detail that matches distance
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
