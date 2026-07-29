import { MAX_STATE_COUNT } from './constants';

export function buildStateColorArray(stateColors: string[]): Float32Array {
  const floats = new Float32Array(MAX_STATE_COUNT * 3);
  for (let i = 0; i < MAX_STATE_COUNT; i++) {
    const hex = stateColors[i] ?? '#000000';
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    floats[i * 3] = r;
    floats[i * 3 + 1] = g;
    floats[i * 3 + 2] = b;
  }
  return floats;
}

export function hexToRgbFloats(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return [r, g, b];
}
