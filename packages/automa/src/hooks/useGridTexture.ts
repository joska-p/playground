import { useFrame } from '@react-three/fiber';
import { useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useStore } from 'zustand';
import { copyGridToTextureData } from '../core/grid-to-texture.ts';
import { simulationStore } from '../stores/simulation/store.ts';
import { uiStore } from '../stores/ui/store.ts';

type UseGridTextureParams = {
  cols: number;
  rows: number;
};

const createGridUniforms = (
  cols: number,
  rows: number,
  aliveColor: string,
  glowColor: string,
  deadColor: string
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

  return {
    gridTexture: { value: tex },
    aliveColor: { value: new THREE.Color(aliveColor) },
    glowColor: { value: new THREE.Color(glowColor) },
    deadColor: { value: new THREE.Color(deadColor) },
    texelSize: { value: new THREE.Vector2(1 / cols, 1 / rows) },
  };
};

const useGridTexture = ({ cols, rows }: UseGridTextureParams) => {
  const lastRenderedGeneration = useRef(-1);
  const textureRef = useRef<THREE.DataTexture | null>(null);

  const aliveColor = useStore(uiStore, (s) => s.aliveColor);
  const glowColor = useStore(uiStore, (s) => s.glowColor);
  const deadColor = useStore(uiStore, (s) => s.deadColor);

  const uniforms = useMemo(
    () => createGridUniforms(cols, rows, aliveColor, glowColor, deadColor),
    [cols, rows, aliveColor, glowColor, deadColor]
  );

  useLayoutEffect(() => {
    textureRef.current = uniforms.gridTexture.value;
  }, [uniforms]);

  useEffect(() => {
    const tex = uniforms.gridTexture.value;
    return () => tex.dispose();
  }, [uniforms]);

  useEffect(() => {
    uniforms.aliveColor.value.set(aliveColor);
    uniforms.glowColor.value.set(glowColor);
    uniforms.deadColor.value.set(deadColor);
  }, [aliveColor, glowColor, deadColor, uniforms]);

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
