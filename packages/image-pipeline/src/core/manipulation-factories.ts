import type {
  ManipulationDefinition,
  NeighborhoodFunction,
  PixelFunction,
  WholeImageFunction,
} from "./image-pipeline.types";

export const definePixel = <Options>(
  id: string,
  manipulationFunction: PixelFunction<Options>
): ManipulationDefinition<Options> => ({
  id,
  type: "pixel",
  function: manipulationFunction,
});

export const defineNeighbor = <Options>(
  id: string,
  radius: number,
  manipulationFunction: NeighborhoodFunction<Options>
): ManipulationDefinition<Options> => ({
  id,
  type: "neighborhood",
  radius,
  function: manipulationFunction,
});

export const defineWhole = <Options>(
  id: string,
  manipulationFunction: WholeImageFunction<Options>
): ManipulationDefinition<Options> => ({
  id,
  type: "whole",
  function: manipulationFunction,
});
