import type {
  ManipulationDefinition,
  ManipulationUIMetadata,
  NeighborhoodFunction,
  PixelFunction,
  WholeImageFunction,
} from './image-pipeline.types';

export const definePixel = <Options, Identifier extends string = string>({
  id,
  execute,
  ui,
}: {
  id: Identifier;
  execute: PixelFunction<Options>;
  ui: ManipulationUIMetadata;
}): ManipulationDefinition<Options> & { id: Identifier } => ({
  id,
  type: 'pixel',
  function: execute,
  ui,
});

export const defineNeighbor = <Options, Identifier extends string = string>({
  id,
  radius,
  execute,
  ui,
}: {
  id: Identifier;
  radius: number;
  execute: NeighborhoodFunction<Options>;
  ui: ManipulationUIMetadata;
}): ManipulationDefinition<Options> & { id: Identifier } => ({
  id,
  type: 'neighborhood',
  radius,
  function: execute,
  ui,
});

export const defineWhole = <Options, Identifier extends string = string>({
  id,
  execute,
  ui,
}: {
  id: Identifier;
  execute: WholeImageFunction<Options>;
  ui: ManipulationUIMetadata;
}): ManipulationDefinition<Options> & { id: Identifier } => ({
  id,
  type: 'whole',
  function: execute,
  ui,
});
