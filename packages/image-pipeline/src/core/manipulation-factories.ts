import type {
  ManipulationDefinition,
  ManipulationUIMetadata,
  NeighborhoodFunction,
  PixelFunction,
  WholeImageFunction,
} from "./image-pipeline.types";

export const definePixel = <Options, Identifier extends string = string>(
  id: Identifier,
  manipulationFunction: PixelFunction<Options>,
  ui: ManipulationUIMetadata
): ManipulationDefinition<Options> & { id: Identifier } => ({
  id,
  type: "pixel",
  function: manipulationFunction,
  ui,
});

export const defineNeighbor = <Options, Identifier extends string = string>(
  id: Identifier,
  radius: number,
  manipulationFunction: NeighborhoodFunction<Options>,
  ui: ManipulationUIMetadata
): ManipulationDefinition<Options> & { id: Identifier } => ({
  id,
  type: "neighborhood",
  radius,
  function: manipulationFunction,
  ui,
});

export const defineWhole = <Options, Identifier extends string = string>(
  id: Identifier,
  manipulationFunction: WholeImageFunction<Options>,
  ui: ManipulationUIMetadata
): ManipulationDefinition<Options> & { id: Identifier } => ({
  id,
  type: "whole",
  function: manipulationFunction,
  ui,
});
