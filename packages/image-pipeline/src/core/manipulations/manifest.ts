import type { ManipulationDefinition, ResizeOptions } from "../image-pipeline.types";
import { boxBlur } from "./neighborhood/box-blur";
import { edgeDetect } from "./neighborhood/edge-detect";
import { gaussianBlur } from "./neighborhood/gaussian-blur";
import { sharpen } from "./neighborhood/sharpen";
import { brightness } from "./pixel/brightness";
import { contrast } from "./pixel/contrast";
import { grayscale } from "./pixel/grayscale";
import { hueRotate } from "./pixel/hue-rotate";
import { invert } from "./pixel/invert";
import { opacity } from "./pixel/opacity";
import { saturation } from "./pixel/saturation";
import { sepia } from "./pixel/sepia";
import { threshold } from "./pixel/threshold";
import { flipHorizontal } from "./whole/flip-horizontal";
import { flipVertical } from "./whole/flip-vertical";
import { histogramEqualize } from "./whole/histogram-equalize";
import { rotate90Cw } from "./whole/rotate-90cw";

// ─── Single Source of Truth ─────────────────────────────────────────────────

export const ALL_MANIPULATIONS = [
  brightness,
  contrast,
  grayscale,
  sepia,
  invert,
  saturation,
  hueRotate,
  opacity,
  threshold,
  boxBlur,
  gaussianBlur,
  sharpen,
  edgeDetect,
  histogramEqualize,
  flipHorizontal,
  flipVertical,
  rotate90Cw,
] as const satisfies readonly ManipulationDefinition[];

// ─── Derive Step type from the manifest ─────────────────────────────────────

type EntryOptions<E> = E extends {
  type: "pixel";
  fn: (r: number, g: number, b: number, a: number, options: infer O) => unknown;
}
  ? O
  : E extends {
        type: "neighborhood";
        fn: (
          src: unknown,
          dest: unknown,
          width: unknown,
          height: unknown,
          options: infer O
        ) => unknown;
      }
    ? O
    : E extends { type: "whole"; fn: (imageData: unknown, options: infer O) => unknown }
      ? O
      : Record<string, never>;

type BuiltInOptions = {
  [E in (typeof ALL_MANIPULATIONS)[number] as E["id"]]: EntryOptions<E>;
};

type BuiltInStep = {
  [K in keyof BuiltInOptions]: BuiltInOptions[K] extends Record<string, never>
    ? { id: K }
    : { id: K; options?: BuiltInOptions[K] };
}[keyof BuiltInOptions];

export type Step =
  | BuiltInStep
  | { id: "resize"; options: ResizeOptions }
  | { id: "snapshot" }
  | { id: string; options?: Record<string, unknown> };
