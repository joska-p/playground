/**
 * Scales a color coordinate from [0, 1] to [0, 255] and rounds it.
 * Handles potential null/undefined values by defaulting to 0.
 */
export function scaleTo255(value: number | null | undefined): number {
  return Math.round(Math.max(0, Math.min(255, (value ?? 0) * 255)));
}

/**
 * Scales an array of color coordinates from [0, 1] to [0, 255].
 */
export function scaleCoordsTo255(coords: (number | null | undefined)[]): [number, number, number] {
  return [scaleTo255(coords[0]), scaleTo255(coords[1]), scaleTo255(coords[2])];
}
