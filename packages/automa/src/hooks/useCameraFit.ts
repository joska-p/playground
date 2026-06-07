import { useCallback, useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import type { OrthographicCamera } from 'three';
import { fitCameraToGrid } from '../core/fit-camera.ts';

const useCameraFit = (
  camera: OrthographicCamera | undefined,
  cols: number,
  rows: number
): void => {
  const cameraRef = useRef<OrthographicCamera | undefined>(undefined);
  const { size } = useThree();

  useEffect(() => {
    cameraRef.current = camera;
  }, [camera]);

  const fit = useCallback(() => {
    const cam = cameraRef.current;
    if (!cam || !size.width || !size.height) return;

    const bounds = fitCameraToGrid(cols, rows, size.width, size.height);

    cam.left = bounds.left;
    cam.right = bounds.right;
    cam.top = bounds.top;
    cam.bottom = bounds.bottom;
    cam.position.set(cols / 2, rows / 2, 10);
    cam.updateProjectionMatrix();
  }, [cols, rows, size.width, size.height]);

  useEffect(() => {
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, [fit]);
};

export { useCameraFit };
