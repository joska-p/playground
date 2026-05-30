export { config } from "./config";
export { Pipeline } from "./pipeline";
export { registry } from "./registry";
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
import { registry } from "./registry";
import { ManipulationDefinition, PipelineConfig } from "./types";

/** Register a manipulation so it can be used by ID in any pipeline. */
export function registerManipulation(def: ManipulationDefinition): void {
  registry.register(def);
}

/** Override global pipeline configuration. */
export function setConfig(overrides: Partial<PipelineConfig>): void {
  if (overrides.maxPixels !== undefined) {
    if (overrides.maxPixels <= 0) {
      throw new RangeError("[image-pipeline] maxPixels must be a positive number");
    }
    config.maxPixels = overrides.maxPixels;
  }
}
