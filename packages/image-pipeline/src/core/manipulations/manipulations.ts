import type { ManipulationDefinition } from "../image-pipeline.types";
import type { Registry } from "../registry";

import { brightness } from "./pixel/brightness";
import { contrast } from "./pixel/contrast";
import { grayscale } from "./pixel/grayscale";
import { hueRotate } from "./pixel/hue-rotate";
import { invert } from "./pixel/invert";
import { opacity } from "./pixel/opacity";
import { saturation } from "./pixel/saturation";
import { sepia } from "./pixel/sepia";
import { threshold } from "./pixel/threshold";

import { boxBlur } from "./neighborhood/box-blur";
import { edgeDetect } from "./neighborhood/edge-detect";
import { gaussianBlur } from "./neighborhood/gaussian-blur";
import { sharpen } from "./neighborhood/sharpen";

import { flipHorizontal } from "./whole/flip-horizontal";
import { flipVertical } from "./whole/flip-vertical";
import { histogramEqualize } from "./whole/histogram-equalize";
import { rotate90Cw } from "./whole/rotate-90cw";

export const PIXEL_MANIPULATIONS: ManipulationDefinition[] = [
  brightness,
  contrast,
  grayscale,
  sepia,
  invert,
  saturation,
  hueRotate,
  opacity,
  threshold,
];

export const NEIGHBOR_MANIPULATIONS: ManipulationDefinition[] = [
  gaussianBlur,
  boxBlur,
  sharpen,
  edgeDetect,
];

export const WHOLE_MANIPULATIONS: ManipulationDefinition[] = [
  histogramEqualize,
  flipHorizontal,
  flipVertical,
  rotate90Cw,
];

export function registerAll(registry: Registry): void {
  for (const def of PIXEL_MANIPULATIONS) registry.register(def);
  for (const def of NEIGHBOR_MANIPULATIONS) registry.register(def);
  for (const def of WHOLE_MANIPULATIONS) registry.register(def);
}
