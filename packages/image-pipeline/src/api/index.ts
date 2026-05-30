import "./neighborhood";
import "./pixel";
import "./polyfill";
import "./whole";

export { config } from "./config";
export { Pipeline } from "./pipeline";
export { registerManipulation, registry } from "./registry";
export type {
  ManipulationDefinition,
  NeighborhoodFn,
  PipelineConfig,
  PipelineResult,
  PixelFn,
  ResizeOptions,
  WholeImageFn,
} from "./types";

import { config } from "./config";
import type { PipelineConfig } from "./types";

/** Override global pipeline configuration. */
export function setConfig(overrides: Partial<PipelineConfig>): void {
  if (overrides.maxPixels !== undefined) {
    if (overrides.maxPixels <= 0) {
      throw new RangeError("[image-pipeline] maxPixels must be a positive number");
    }
    config.maxPixels = overrides.maxPixels;
  }
}
