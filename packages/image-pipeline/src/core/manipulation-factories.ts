import type { NeighborhoodFn, PixelFn, WholeImageFn } from "./image-pipeline.types";

export function definePixel<
  I extends string,
  O extends Record<string, unknown> = Record<string, unknown>,
>(id: I, fn: PixelFn<O>) {
  return { id, type: "pixel" as const, fn };
}

export function defineNeighbor<
  I extends string,
  O extends Record<string, unknown> = Record<string, unknown>,
>(id: I, radius: number, fn: NeighborhoodFn<O>) {
  return { id, type: "neighborhood" as const, radius, fn };
}

export function defineWhole<
  I extends string,
  O extends Record<string, unknown> = Record<string, unknown>,
>(id: I, fn: WholeImageFn<O>) {
  return { id, type: "whole" as const, fn };
}
