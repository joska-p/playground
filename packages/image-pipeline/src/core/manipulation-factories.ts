import type { NeighborhoodFn, PixelFn, WholeImageFn } from "./image-pipeline.types";

export const definePixel = (id: string, fn: PixelFn) => ({
  id,
  type: "pixel" as const,
  fn,
});

export const defineNeighbor = (id: string, radius: number, fn: NeighborhoodFn) => ({
  id,
  type: "neighborhood" as const,
  radius,
  fn,
});

export const defineWhole = (id: string, fn: WholeImageFn) => ({
  id,
  type: "whole" as const,
  fn,
});
