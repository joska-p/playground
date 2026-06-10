import { createRemap } from './maths';

const toRGB = createRemap(0, 1).to(0, 255);

export function scaleTo255(value: number | null | undefined): number {
  return toRGB.asInt(Math.max(0, value ?? 0));
}
