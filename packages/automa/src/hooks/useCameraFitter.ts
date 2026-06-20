import { useThree } from '@react-three/fiber';
import { CAMERA_Z } from '@repo/automa-engine/config';
import { useLayoutEffect } from 'react';
import type { OrthographicCamera } from 'three';
import { fitCameraToGrid } from '../utils/camera';

const useCameraFitter = (cols: number, rows: number): void => {
  const size = useThree((s) => s.size);
  const getState = useThree((s) => s.get);

  useLayoutEffect(() => {
    if (size.width === 0 || size.height === 0) return;

    const state = getState();
    const camera = state.camera as OrthographicCamera;
    const { left, right, top, bottom } = fitCameraToGrid(
      cols,
      rows,
      size.width,
      size.height
    );
    const pad = 1.15;
    camera.left = left * pad;
    camera.right = right * pad;
    camera.top = top * pad;
    camera.bottom = bottom * pad;
    camera.position.set(0, 0, CAMERA_Z);
    camera.updateProjectionMatrix();
  }, [cols, rows, size, getState]);
};

export { useCameraFitter };
