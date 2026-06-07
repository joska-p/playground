import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { fitCameraToGrid } from '../core/fit-camera.ts';
import { CAMERA_Z } from '../config.ts';

const useCameraFit = (cols: number, rows: number): void => {
  const get = useThree((state) => state.get);
  const size = useThree((state) => state.size);

  useEffect(() => {
    if (!size.width || !size.height) return;

    const camera = get().camera;
    if (!(camera instanceof THREE.OrthographicCamera)) return;

    const bounds = fitCameraToGrid(cols, rows, size.width, size.height);
    camera.left = bounds.left;
    camera.right = bounds.right;
    camera.top = bounds.top;
    camera.bottom = bounds.bottom;
    camera.position.set(0, 0, CAMERA_Z);
    camera.updateProjectionMatrix();
  }, [get, cols, rows, size.width, size.height]);
};

export { useCameraFit };
