import type { ManipulationDefinition, NeighborhoodFn, PixelFn, WholeImageFn } from "./image-pipeline.types";

export const definePixel = <O>(id: string, fn: PixelFn<O>): ManipulationDefinition<O> => ({
  id,
  type: "pixel",
  fn,
});

export const defineNeighbor = <O>(id: string, radius: number, fn: NeighborhoodFn<O>): ManipulationDefinition<O> => ({
  id,
  type: "neighborhood",
  radius,
  fn,
});

export const defineWhole = <O>(id: string, fn: WholeImageFn<O>): ManipulationDefinition<O> => ({
  id,
  type: "whole",
  fn,
});
