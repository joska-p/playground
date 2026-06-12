import type {
  ManipulationDefinition,
  ManipulationUIMetadata,
  NeighborhoodFunction,
  PixelFunction,
  WholeImageFunction
} from './image-pipeline.types';

type DefineManipParams<Options, Identifier extends string> = {
  id: Identifier;
  ui: ManipulationUIMetadata;
  options?: Options;
} & (
  | { access: 'pixel'; execute: PixelFunction<Options> }
  | {
      access: 'neighborhood';
      radius: number;
      execute: NeighborhoodFunction<Options>;
    }
  | { access: 'global'; execute: WholeImageFunction<Options> }
);

export function defineManip<Options, Identifier extends string = string>(
  params: DefineManipParams<Options, Identifier>
): ManipulationDefinition<Options> & { id: Identifier } {
  return params as ManipulationDefinition<Options> & { id: Identifier };
}
