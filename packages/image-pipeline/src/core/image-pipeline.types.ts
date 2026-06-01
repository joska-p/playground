import type { Registry } from "./registry";

// ─── Manipulation Function Signatures ───────────────────────────────────────

export type PixelFn = (
  r: number,
  g: number,
  b: number,
  a: number,
  options: Record<string, unknown>
) => [number, number, number, number];

export type NeighborhoodFn = (
  src: Uint8ClampedArray,
  dest: Uint8ClampedArray,
  width: number,
  height: number,
  options: Record<string, unknown>
) => void;

export type WholeImageFn = (imageData: ImageData, options: Record<string, unknown>) => ImageData;

// ─── Manipulation Definition ─────────────────────────────────────────────────

export type ManipulationDefinition = {
  id: string;
  type: "pixel" | "neighborhood" | "whole";
  /** Required when type is 'neighborhood' */
  radius?: number;
  fn: PixelFn | NeighborhoodFn | WholeImageFn;
};

// ─── Pipeline Types ──────────────────────────────────────────────────────────

export type ResizeOptions =
  | { width: number; height?: never; maxPixels?: never; fit?: never }
  | { height: number; width?: never; maxPixels?: never; fit?: never }
  | { width: number; height: number; fit?: "fill" | "cover" | "contain"; maxPixels?: never }
  | { maxPixels: number; width?: never; height?: never; fit?: never };

export type PipelineContext = {
  registry: Registry;
  maxPixels: number;
};

export type PipelineResult = {
  source: ImageData;
  final: ImageData;
  snapshots: ImageData[];
};

export type PipelineConfig = {
  maxPixels: number;
};

// ─── Step Types ───────────────────────────────────────────────────────────────

export type Step =
  | { id: "snapshot"; options?: never }
  | { id: "resize"; options: ResizeOptions }
  | { id: string; options?: Record<string, unknown> };
