import type { PixelData } from './pixel-data';
import type { Registry } from './registry';

// ─── UI Metadata ──────────────────────────────────────────────────────────────

/** UI argument slider/field definition for a manipulation option. */
export type ArgDefinition = {
    key: string;
    label: string;
    min: number;
    max: number;
    step: number;
};

/** Metadata for displaying a manipulation in the UI. */
export type ManipulationUIMetadata = {
    name: string;
    description: string;
    longDescription: string;
    defaultArgs: Record<string, number>;
    argDefinitions: ArgDefinition[];
};

// ─── Manipulation Function Parameters ────────────────────────────────────────

/** Parameters passed to a per-pixel transform function. */
export type PixelParameters<Options> = {
    options: Options;
    red: number;
    green: number;
    blue: number;
    alpha: number;
};

/** Parameters passed to a neighborhood convolution function. */
export type NeighborhoodParameters<Options> = {
    options: Options;
    source: Uint8ClampedArray;
    destination: Uint8ClampedArray;
    width: number;
    height: number;
};

/** Parameters passed to a global whole-image transform function. */
export type WholeImageParameters<Options> = {
    options: Options;
    imageData: PixelData;
};

// ─── Manipulation Function Signatures ────────────────────────────────────────

/** Per-pixel transform function returning RGBA tuple. */
export type PixelFunction<
    Options = any /* eslint-disable-line @typescript-eslint/no-explicit-any */
> = (parameters: PixelParameters<Options>) => [number, number, number, number];

/** Neighborhood convolution function modifying destination array in place. */
export type NeighborhoodFunction<
    Options = any /* eslint-disable-line @typescript-eslint/no-explicit-any */
> = (parameters: NeighborhoodParameters<Options>) => void;

/** Global whole-image transform function returning PixelData. */
export type WholeImageFunction<
    Options = any /* eslint-disable-line @typescript-eslint/no-explicit-any */
> = (parameters: WholeImageParameters<Options>) => PixelData;

// ─── Manipulation Definition ─────────────────────────────────────────────────

/**
 * Standardized definition for any image manipulation. The 'options' property is a type-only marker
 * to simplify Step derivation.
 */
export type ManipulationDefinition<
    Options = any /* eslint-disable-line @typescript-eslint/no-explicit-any */
> = {
    id: string;
    options?: Options;
    ui: ManipulationUIMetadata;
} & (
    | { access: 'pixel'; execute: PixelFunction<Options> }
    | {
          access: 'neighborhood';
          radius: number;
          execute: NeighborhoodFunction<Options>;
      }
    | { access: 'global'; execute: WholeImageFunction<Options> }
);

// ─── Pipeline Types ──────────────────────────────────────────────────────────

/** Context provided to the pipeline runner containing registry and constraints. */
export type PipelineContext = {
    registry: Registry;
    maximumPixels: number;
};
