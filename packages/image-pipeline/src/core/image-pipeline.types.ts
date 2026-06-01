import type { Registry } from "./registry";

// ─── Manipulation Function Signatures ────────────────────────────────────────

export type PixelFn<O = any> = (
  options: O,
  r: number,
  g: number,
  b: number,
  a: number
) => [number, number, number, number];

export type NeighborhoodFn<O = any> = (
  options: O,
  src: Uint8ClampedArray,
  dest: Uint8ClampedArray,
  width: number,
  height: number
) => void;

export type WholeImageFn<O = any> = (
  options: O,
  imageData: ImageData
) => ImageData;

// ─── Manipulation Definition ─────────────────────────────────────────────────

export type ManipulationDefinition<O = any> =
  | { id: string; type: "pixel"; fn: PixelFn<O> }
  | { id: string; type: "neighborhood"; radius: number; fn: NeighborhoodFn<O> }
  | { id: string; type: "whole"; fn: WholeImageFn<O> };

// ─── Pipeline Types ──────────────────────────────────────────────────────────

export type ResizeOptions =
  | { width: number; height?: never; maxPixels?: never; fit?: never }
  | { height: number; width?: never; maxPixels?: never; fit?: never }
  | { width: number; height: number; fit?: "fill" | "cover" | "contain"; maxPixels?: never }
  | { maxPixels: number; width?: never; height?: never; fit?: never };

export type PipelineContext = {
  registry: Registry;
  maxPixels: number;
}

export type PipelineResult = {
  source: ImageData;
  final: ImageData;
  snapshots: ImageData[];
}
