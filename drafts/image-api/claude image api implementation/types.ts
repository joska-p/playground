// ─── Manipulation Function Signatures ───────────────────────────────────────

export type PixelFn = (
  r: number,
  g: number,
  b: number,
  a: number,
  opts: Record<string, unknown>
) => [number, number, number, number];

export type NeighborhoodFn = (
  src: Uint8ClampedArray,
  dest: Uint8ClampedArray,
  width: number,
  height: number,
  opts: Record<string, unknown>
) => void;

export type WholeImageFn = (imageData: ImageData, opts: Record<string, unknown>) => ImageData;

// ─── Manipulation Definition ─────────────────────────────────────────────────

export interface ManipulationDefinition {
  id: string;
  type: "pixel" | "neighborhood" | "whole";
  /** Required when type is 'neighborhood' */
  radius?: number;
  fn: PixelFn | NeighborhoodFn | WholeImageFn;
}

// ─── Pipeline Types ──────────────────────────────────────────────────────────

export type ResizeOptions =
  | { width: number; height?: never; maxPixels?: never; fit?: never }
  | { height: number; width?: never; maxPixels?: never; fit?: never }
  | { width: number; height: number; fit?: "fill" | "cover" | "contain"; maxPixels?: never }
  | { maxPixels: number; width?: never; height?: never; fit?: never };

export interface PipelineResult {
  final: ImageData;
  snapshots: ImageData[];
}

export interface PipelineConfig {
  maxPixels: number;
}

// ─── Internal Step Types ─────────────────────────────────────────────────────

export interface ManipStep {
  kind: "manip";
  id: string;
  opts: Record<string, unknown>;
}

export interface SnapshotStep {
  kind: "snapshot";
}

export type Step = ManipStep | SnapshotStep;
