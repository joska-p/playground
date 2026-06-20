import type { ArgDefinition, Step } from '@repo/pixel-engine';
import { ALL_MANIPULATIONS } from '@repo/pixel-engine';
import { WorkerPool } from '@repo/worker-pool';

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

const pool = new WorkerPool<RunConfig, ImageData[]>({
  maxPoolSize: navigator.hardwareConcurrency ?? 4,
  workerFactory: () =>
    new Worker(new URL('./pipeline-worker', import.meta.url), {
      type: 'module'
    }),
  serialize: (task) => {
    const clampedCopy = new Uint8ClampedArray(task.sourceImageData.data);
    const imageDataCopy = new ImageData(
      clampedCopy,
      task.sourceImageData.width,
      task.sourceImageData.height
    );
    return {
      message: {
        sourceImageData: imageDataCopy,
        steps: task.steps,
        maximumPixels: task.maximumPixels
      },
      transfer: [imageDataCopy.data.buffer]
    };
  },
  deserialize: (event) => {
    if ('error' in event.data)
      return { ok: false, error: new Error(event.data.error) };
    return { ok: true, value: event.data as ImageData[] };
  }
});

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

export const pixel = {
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
    return pool.run(config);
  },

  teardown(): void {
    pool.teardown();
  }
};
