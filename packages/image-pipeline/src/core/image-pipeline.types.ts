import type { Registry } from "./registry";

// ─── Manipulation Function Signatures (generics capture options shape) ───────

export type PixelFn<O extends Record<string, unknown> = Record<string, unknown>> = (
  r: number,
  g: number,
  b: number,
  a: number,
  options: O
) => [number, number, number, number];

export type NeighborhoodFn<O extends Record<string, unknown> = Record<string, unknown>> = (
  src: Uint8ClampedArray,
  dest: Uint8ClampedArray,
  width: number,
  height: number,
  options: O
) => void;

export type WholeImageFn<O extends Record<string, unknown> = Record<string, unknown>> = (
  imageData: ImageData,
  options: O
) => ImageData;

// ─── Manipulation Definition ─────────────────────────────────────────────────

export type ManipulationDefinition = {
  id: string;
  type: "pixel" | "neighborhood" | "whole";
  /** Required when type is 'neighborhood' */
  radius?: number;
  fn: PixelFn | NeighborhoodFn | WholeImageFn;
};

// ─── Type Guards ──────────────────────────────────────────────────────────────

export function isPixelDef(
  def: ManipulationDefinition
): def is ManipulationDefinition & { type: "pixel"; fn: PixelFn } {
  return def.type === "pixel";
}

export function isNeighborhoodDef(
  def: ManipulationDefinition
): def is ManipulationDefinition & { type: "neighborhood"; fn: NeighborhoodFn } {
  return def.type === "neighborhood";
}

export function isWholeImageDef(
  def: ManipulationDefinition
): def is ManipulationDefinition & { type: "whole"; fn: WholeImageFn } {
  return def.type === "whole";
}

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
