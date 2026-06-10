import { useFrame } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { simulationStore } from '../../stores/simulation/store';
import { copyGridToTextureData } from '../../utils/grid-to-texture';
import { type GridUniforms } from './grid-texture.utils';

/**
 * Runs every frame to:
 *  - keep the `time` uniform in sync with the clock
 *  - copy the simulation grid into the DataTexture when a new generation arrives
 *
 * Uses a ref to always read the latest uniforms object without re-registering
 * the frame callback when uniforms change (e.g. after a grid resize).
 */
export const useFrameSync = (uniforms: GridUniforms): void => {
  const uniformsRef = useRef(uniforms);
  useEffect(() => {
    uniformsRef.current = uniforms;
  }, [uniforms]);

  const lastRenderedGeneration = useRef(-1);

  useFrame((state) => {
    const u = uniformsRef.current;
    u.time.value = state.clock.elapsedTime;

    const { grid, generation } = simulationStore.getState();

    if (generation === lastRenderedGeneration.current) return;

    const texture = u.gridTexture.value;
    copyGridToTextureData(grid, texture.image.data as Uint8Array);
    texture.needsUpdate = true;

    lastRenderedGeneration.current = generation;
  });
};
