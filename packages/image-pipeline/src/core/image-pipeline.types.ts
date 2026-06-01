import type { Registry } from "./registry";

// ─── Manipulation Function Parameters ────────────────────────────────────────

export type PixelParameters<Options> = {
  options: Options;
  red: number;
  green: number;
  blue: number;
  alpha: number;
};

export type NeighborhoodParameters<Options> = {
  options: Options;
  source: Uint8ClampedArray;
  destination: Uint8ClampedArray;
  width: number;
  height: number;
};

export type WholeImageParameters<Options> = {
  options: Options;
  imageData: ImageData;
};

// ─── Manipulation Function Signatures ────────────────────────────────────────

export type PixelFunction<
  Options = any /* eslint-disable-line @typescript-eslint/no-explicit-any */,
> = (parameters: PixelParameters<Options>) => [number, number, number, number];

export type NeighborhoodFunction<
  Options = any /* eslint-disable-line @typescript-eslint/no-explicit-any */,
> = (parameters: NeighborhoodParameters<Options>) => void;

export type WholeImageFunction<
  Options = any /* eslint-disable-line @typescript-eslint/no-explicit-any */,
> = (parameters: WholeImageParameters<Options>) => ImageData;

// ─── Manipulation Definition ─────────────────────────────────────────────────

/**
 * Standardized definition for any image manipulation.
 * The 'options' property is a type-only marker to simplify Step derivation.
 */
export type ManipulationDefinition<
  Options = any /* eslint-disable-line @typescript-eslint/no-explicit-any */,
> = {
  id: string;
  options?: Options;
} & (
  | { type: "pixel"; function: PixelFunction<Options> }
  | { type: "neighborhood"; radius: number; function: NeighborhoodFunction<Options> }
  | { type: "whole"; function: WholeImageFunction<Options> }
);

// ─── Pipeline Types ──────────────────────────────────────────────────────────

export type ResizeOptions =
  | { width: number; height?: never; maximumPixels?: never; fit?: never }
  | { height: number; width?: never; maximumPixels?: never; fit?: never }
  | { width: number; height: number; fit?: "fill" | "cover" | "contain"; maximumPixels?: never }
  | { maximumPixels: number; width?: never; height?: never; fit?: never };

export type PipelineContext = {
  registry: Registry;
  maximumPixels: number;
};

export type PipelineResult = {
  source: ImageData;
  final: ImageData;
  snapshots: ImageData[];
};
