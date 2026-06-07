import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import type { StoreApi } from 'zustand/vanilla';
import { copyGridToTextureData } from '../core/grid-to-texture.ts';
import type { CAStore } from '../stores/automaton/types.ts';

const useGridTexture = (
  store: StoreApi<CAStore>,
  cols: number,
  rows: number,
  aliveColor: string,
  deadColor: string
) => {
  const lastRenderedGeneration = useRef(-1);

  const uniforms = useMemo(() => {
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
      deadColor: { value: new THREE.Color(deadColor) },
    };
  }, [cols, rows, aliveColor, deadColor]);

  const texRef = useRef(uniforms.gridTexture.value);
  const dataRef = useRef(uniforms.gridTexture.value.image.data as Uint8Array);

  // sync initial grid to texture on first mount; intentionally no deps
  useEffect(() => {
    const state = store.getState();
    copyGridToTextureData(state.grid, dataRef.current);
    texRef.current.needsUpdate = true;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useFrame(() => {
    const state = store.getState();
    if (state.generation !== lastRenderedGeneration.current) {
      copyGridToTextureData(state.grid, dataRef.current);
      texRef.current.needsUpdate = true;
      lastRenderedGeneration.current = state.generation;
    }
  });

  useEffect(() => {
    uniforms.aliveColor.value.set(aliveColor);
    uniforms.deadColor.value.set(deadColor);
  }, [aliveColor, deadColor, uniforms]);

  return { uniforms };
};

export { useGridTexture };
