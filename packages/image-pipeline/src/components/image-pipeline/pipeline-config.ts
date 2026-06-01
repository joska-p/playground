import type { PipelineConfig } from "./image-pipeline.types";

export const MAX_PIXELS = 16_000_000;

export function defaultConfig(): PipelineConfig {
  return { maxPixels: MAX_PIXELS };
}
