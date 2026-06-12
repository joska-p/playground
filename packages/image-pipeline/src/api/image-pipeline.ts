import type { ArgDefinition } from '../core/image-pipeline.types';
import type { Step } from '../core/manipulations/manifest';
import { ALL_MANIPULATIONS } from '../core/manipulations/manifest';
import { pipelineGateway } from './pipeline-gateway';

export type { ArgDefinition, Step };

export type ManipulationInfo = {
  readonly id: string;
  readonly access: 'pixel' | 'neighborhood' | 'global';
  readonly name: string;
  readonly description: string;
  readonly longDescription: string;
  readonly defaultArgs: Readonly<Record<string, number>>;
  readonly argDefinitions: ReadonlyArray<ArgDefinition>;
};

export type RunConfig = {
  sourceImageData: ImageData;
  steps: readonly Step[];
  maximumPixels?: number;
};

function buildCatalog(): Record<string, ManipulationInfo> {
  const catalog: Record<string, ManipulationInfo> = {};
  for (const def of ALL_MANIPULATIONS) {
    catalog[def.id] = {
      id: def.id,
      access: def.access,
      name: def.ui.name,
      description: def.ui.description,
      longDescription: def.ui.longDescription,
      defaultArgs: def.ui.defaultArgs,
      argDefinitions: def.ui.argDefinitions
    };
  }
  return catalog;
}

const MANIPULATIONS = buildCatalog();

export const imagePipeline = {
  get manipulations(): Readonly<Record<string, ManipulationInfo>> {
    return MANIPULATIONS;
  },

  getManipulationsByAccess(
    access: 'pixel' | 'neighborhood' | 'global'
  ): Record<string, ManipulationInfo> {
    const result: Record<string, ManipulationInfo> = {};
    for (const [id, info] of Object.entries(MANIPULATIONS)) {
      if (info.access === access) result[id] = info;
    }
    return result;
  },

  run(config: RunConfig): Promise<ImageData[]> {
    return pipelineGateway.run({
      sourceImageData: config.sourceImageData,
      steps: [...config.steps] as Step[],
      maximumPixels: config.maximumPixels
    });
  },

  teardown(): void {
    pipelineGateway.teardown();
  }
};
