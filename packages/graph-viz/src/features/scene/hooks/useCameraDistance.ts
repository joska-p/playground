import { useFrame, useThree } from '@react-three/fiber';
import { useState } from 'react';
import { smartLabel } from '../../../config';

/**
 * Track camera distance from origin, with a threshold filter
 * to avoid unnecessary re-renders on tiny movements.
 * Used for LOD and smart-label fading in overview mode.
 */
export function useCameraDistance(): number {
  const { camera } = useThree();
  const [cameraDistance, setCameraDistance] = useState(80);

  useFrame(() => {
    const dist = camera.position.length();
    setCameraDistance((prev) =>
      Math.abs(prev - dist) > smartLabel.cameraUpdateThreshold ? dist : prev
    );
  });

  return cameraDistance;
}
