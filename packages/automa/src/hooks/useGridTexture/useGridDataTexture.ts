import { useEffect, useMemo } from 'react';
import type * as THREE from 'three';
import { createGridDataTexture } from './grid-texture.utils';

/**
 * Creates a DataTexture sized to the grid and disposes it when cols/rows change
 * or the component unmounts.
 */
export const useGridDataTexture = (cols: number, rows: number): THREE.DataTexture => {
  const texture = useMemo(() => createGridDataTexture(cols, rows), [cols, rows]);

  useEffect(() => {
    return () => {
      texture.dispose();
    };
  }, [texture]);

  return texture;
};
