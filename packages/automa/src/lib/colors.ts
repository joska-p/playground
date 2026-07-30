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

function lerpColor(hexA: string, hexB: string, t: number): string {
  const rA = parseInt(hexA.slice(1, 3), 16);
  const gA = parseInt(hexA.slice(3, 5), 16);
  const bA = parseInt(hexA.slice(5, 7), 16);

  const rB = parseInt(hexB.slice(1, 3), 16);
  const gB = parseInt(hexB.slice(3, 5), 16);
  const bB = parseInt(hexB.slice(5, 7), 16);

  const r = Math.round(rA + (rB - rA) * t);
  const g = Math.round(gA + (gB - gA) * t);
  const b = Math.round(bA + (bB - bA) * t);

  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

// Function to compute all derived state colors given stateCount, deadColor, and aliveColor
export function computeDerivedColors(
  stateCount: number,
  deadHex: string,
  aliveHex: string
): string[] {
  const colors = [deadHex, aliveHex];

  // Derive states 2..N-1 (decaying states in Generations automata)
  for (let i = 2; i < stateCount; i++) {
    // Decay factor: state 2 is close to alive, maxState is close to dead
    const t = (i - 1) / (stateCount - 1);
    colors.push(lerpColor(aliveHex, deadHex, t));
  }

  return colors;
}
