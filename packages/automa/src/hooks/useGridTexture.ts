import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { copyGridToTextureData } from '../core/grid-to-texture.ts';
import type { Grid } from '../core/types.ts';

const useGridTexture = (
  grid: Grid,
  generation: number,
  cols: number,
  rows: number,
  aliveColor: string,
  glowColor: string,
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
      glowColor: { value: new THREE.Color(glowColor) },
      deadColor: { value: new THREE.Color(deadColor) },
      texelSize: { value: new THREE.Vector2(1 / cols, 1 / rows) },
    };
  }, [cols, rows, aliveColor, glowColor, deadColor]);

  const texRef = useRef(uniforms.gridTexture.value);
  const dataRef = useRef(uniforms.gridTexture.value.image.data as Uint8Array);

  useFrame(() => {
    if (generation !== lastRenderedGeneration.current) {
      copyGridToTextureData(grid, dataRef.current);
      texRef.current.needsUpdate = true;
      lastRenderedGeneration.current = generation;
    }
  });

  useEffect(() => {
    uniforms.aliveColor.value.set(aliveColor);
    uniforms.glowColor.value.set(glowColor);
    uniforms.deadColor.value.set(deadColor);
  }, [aliveColor, glowColor, deadColor, uniforms]);

  return { uniforms };
};

export { useGridTexture };
