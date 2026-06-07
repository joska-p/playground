import { useEffect, useRef } from 'react';
import type { OrthographicCamera } from 'three';
import { fitCameraToGrid } from '../core/fit-camera.ts';

const useCameraFit = (
  camera: OrthographicCamera | undefined,
  cols: number,
  rows: number,
): void => {
  const cameraRef = useRef<OrthographicCamera | undefined>(undefined);

  useEffect(() => {
    cameraRef.current = camera;
  }, [camera]);

  useEffect(() => {
    const cam = cameraRef.current;
    if (!cam) return;

    const bounds = fitCameraToGrid(
      cols,
      rows,
      window.innerWidth,
      window.innerHeight,
    );

    cam.left = bounds.left;
    cam.right = bounds.right;
    cam.top = bounds.top;
    cam.bottom = bounds.bottom;
    cam.position.set(cols / 2, rows / 2, 10);
    cam.updateProjectionMatrix();
  }, [cols, rows]);
};

export { useCameraFit };
