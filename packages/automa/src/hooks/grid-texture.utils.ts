import { MAX_STATE_COUNT } from '../config';

/**
 * Convert an array of CSS hex colour strings (e.g. '#ff0000') into a flat
 * Float32Array of [r, g, b, r, g, b, ...] in the range [0, 1].
 * Always returns exactly MAX_STATE_COUNT × 3 floats, padding with zeros.
 */
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

/** Parse a CSS hex colour string to an [r, g, b] float tuple. */
export function hexToRgbFloats(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return [r, g, b];
}
