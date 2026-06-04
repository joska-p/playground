import { createRemap } from './maths';

const toRGB = createRemap(0, 1).to(0, 255);

export function scaleTo255(value: number | null | undefined): number {
  return toRGB.asInt(Math.max(0, value ?? 0));
}

export function scaleCoordsTo255(
  coords: (number | null | undefined)[]
): [number, number, number] {
  return [scaleTo255(coords[0]), scaleTo255(coords[1]), scaleTo255(coords[2])];
}
