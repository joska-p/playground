import type {
  ManipulationDefinition,
  NeighborhoodFunction,
  PixelFunction,
  WholeImageFunction,
} from "./image-pipeline.types";

export const definePixel = <Options, Identifier extends string = string>(
  id: Identifier,
  manipulationFunction: PixelFunction<Options>
): ManipulationDefinition<Options> & { id: Identifier } => ({
  id,
  type: "pixel",
  function: manipulationFunction,
});

export const defineNeighbor = <Options, Identifier extends string = string>(
  id: Identifier,
  radius: number,
  manipulationFunction: NeighborhoodFunction<Options>
): ManipulationDefinition<Options> & { id: Identifier } => ({
  id,
  type: "neighborhood",
  radius,
  function: manipulationFunction,
});

export const defineWhole = <Options, Identifier extends string = string>(
  id: Identifier,
  manipulationFunction: WholeImageFunction<Options>
): ManipulationDefinition<Options> & { id: Identifier } => ({
  id,
  type: "whole",
  function: manipulationFunction,
});
