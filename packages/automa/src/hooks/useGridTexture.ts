import { useFrame } from '@react-three/fiber';
import { useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useStore } from 'zustand';
import { MAX_STATE_COUNT } from '../core/config.ts';
import { copyGridToTextureData } from '../utils/grid-to-texture.ts';
import { simulationStore } from '../stores/simulation/store.ts';
import { uiStore } from '../stores/ui/store.ts';

type UseGridTextureParams = {
  cols: number;
  rows: number;
};

const createGridUniforms = (
  cols: number,
  rows: number,
  stateColors: string[],
  glowColor: string
) => {
  const data = new Uint8Array(cols * rows);
  const tex = new THREE.DataTexture(
    data,
    cols,
    rows,
    THREE.RedFormat,
    THREE.UnsignedByteType
  );
  tex.magFilter = THREE.NearestFilter;
  tex.minFilter = THREE.NearestFilter;

  const palette: THREE.Color[] = [];
  for (let i = 0; i < MAX_STATE_COUNT; i++) {
    palette.push(new THREE.Color(stateColors[i] ?? '#000000'));
  }

  return {
    gridTexture: { value: tex },
    stateColors: { value: palette },
    glowColor: { value: new THREE.Color(glowColor) },
    texelSize: { value: new THREE.Vector2(1 / cols, 1 / rows) },
  };
};

const useGridTexture = ({ cols, rows }: UseGridTextureParams) => {
  const lastRenderedGeneration = useRef(-1);
  const textureRef = useRef<THREE.DataTexture | null>(null);

  const stateColors = useStore(uiStore, (s) => s.stateColors);
  const glowColor = useStore(uiStore, (s) => s.glowColor);

  const uniforms = useMemo(
    () => createGridUniforms(cols, rows, stateColors, glowColor),
    [cols, rows, stateColors, glowColor]
  );

  useLayoutEffect(() => {
    textureRef.current = uniforms.gridTexture.value;
  }, [uniforms]);

  useEffect(() => {
    const tex = uniforms.gridTexture.value;
    return () => tex.dispose();
  }, [uniforms]);

  useEffect(() => {
    for (let i = 0; i < MAX_STATE_COUNT; i++) {
      uniforms.stateColors.value[i].set(stateColors[i] ?? '#000000');
    }
    uniforms.glowColor.value.set(glowColor);
  }, [stateColors, glowColor, uniforms]);

  useFrame(() => {
    const { running } = uiStore.getState();
    const { grid, generation } = simulationStore.getState();

    if (!running && generation === lastRenderedGeneration.current) return;
    if (generation === lastRenderedGeneration.current) return;

    const tex = textureRef.current;
    if (tex) {
      copyGridToTextureData(grid, tex.image.data as Uint8Array);
      tex.needsUpdate = true;
    }

    lastRenderedGeneration.current = generation;
  });

  return { uniforms };
};

export { useGridTexture };
export type { UseGridTextureParams };
