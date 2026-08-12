import type {
    ManipulationDefinition,
    ManipulationUIMetadata,
    NeighborhoodFunction,
    PixelFunction,
    WholeImageFunction
} from './types';

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

/**
 * Factory helper for creating typed manipulation definitions.
 *
 * @param params - Manipulation properties including access mode, UI metadata, and execute function.
 * @returns Strongly-typed manipulation definition.
 */
export function defineManip<Options, Identifier extends string = string>(
    params: DefineManipParams<Options, Identifier>
): ManipulationDefinition<Options> & { id: Identifier } {
    return params;
}

