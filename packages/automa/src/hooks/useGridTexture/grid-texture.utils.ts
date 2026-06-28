import { MAX_STATE_COUNT } from '@repo/automa-engine/config';
import * as THREE from 'three';

export type GridUniforms = ReturnType<typeof buildGridUniforms>;

export const createGridDataTexture = (cols: number, rows: number): THREE.DataTexture => {
  const data = new Uint8Array(cols * rows);
  const texture = new THREE.DataTexture(data, cols, rows, THREE.RedFormat, THREE.UnsignedByteType);
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.NearestFilter;
  return texture;
};

const buildInitialPalette = (stateColors: string[]): THREE.Color[] =>
  Array.from({ length: MAX_STATE_COUNT }, (_, i) => new THREE.Color(stateColors[i] ?? '#000000'));

export const buildGridUniforms = (
  cols: number,
  rows: number,
  texture: THREE.DataTexture,
  stateColors: string[],
  glowColor: string
) => ({
  gridTexture: { value: texture },
  stateColors: { value: buildInitialPalette(stateColors) },
  glowColor: { value: new THREE.Color(glowColor) },
  texelSize: { value: new THREE.Vector2(1 / cols, 1 / rows) },
  time: { value: 0 },
  mouse: { value: new THREE.Vector2(0.5, 0.5) }
});
