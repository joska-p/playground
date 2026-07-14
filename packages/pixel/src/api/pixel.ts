import type { Step } from '@repo/pixel-engine/manipulations/manifest';
import { ALL_MANIPULATIONS } from '@repo/pixel-engine/manipulations/manifest';
import { PixelData } from '@repo/pixel-engine/pixel-data';
import type { ArgDefinition } from '@repo/pixel-engine/types';
import { WorkerPool } from '@repo/worker-pool/worker-pool';

export type { ArgDefinition, Step };

export type ManipulationInfo = {
  readonly id: string;
  readonly access: 'pixel' | 'neighborhood' | 'global';
  readonly name: string;
  readonly description: string;
  readonly longDescription: string;
  readonly defaultArgs: Readonly<Record<string, number>>;
  readonly argDefinitions: readonly ArgDefinition[];
};

export type RunConfig = {
  sourceImageData: ImageData;
  steps: readonly Step[];
  maximumPixels?: number;
};

type SerializedImageData = {
  data: Uint8ClampedArray;
  width: number;
  height: number;
};

function isSerializedImageDataArray(data: unknown): data is SerializedImageData[] {
  return (
    Array.isArray(data) &&
    data.every((item: unknown) => {
      // 1. Verify it's a non-null object first
      if (typeof item !== 'object' || item === null) {
        return false;
      }

      // 2. Cast to a Record so the linter knows property access is safe
      const obj = item as Record<string, unknown>;

      // 3. Perform your runtime checks safely
      return (
        'data' in obj &&
        'width' in obj &&
        'height' in obj &&
        obj['data'] instanceof Uint8ClampedArray &&
        typeof obj['width'] === 'number' &&
        typeof obj['height'] === 'number'
      );
    })
  );
}

const pool = new WorkerPool<RunConfig, ImageData[]>({
  maxPoolSize: navigator.hardwareConcurrency,
  workerFactory: () =>
    new Worker(new URL('./pipeline-worker', import.meta.url), {
      type: 'module'
    }),
  serialize: (task) => {
    const clampedCopy = new Uint8ClampedArray(task.sourceImageData.data);
    const pixelData = new PixelData(
      task.sourceImageData.width,
      task.sourceImageData.height,
      clampedCopy
    );
    return {
      message: {
        sourceImageData: pixelData,
        steps: task.steps,
        maximumPixels: task.maximumPixels
      },
      transfer: [clampedCopy.buffer]
    };
  },
  deserialize: (event: MessageEvent<Record<string, unknown>>) => {
    if ('error' in event.data)
      return { ok: false, error: new Error(event.data['error'] as string) };

    if (!isSerializedImageDataArray(event.data)) {
      return { ok: false, error: new Error('Invalid serialized ImageData format') };
    }

    return {
      ok: true,
      value: event.data.map((r) => {
        const clonedData = Uint8ClampedArray.from(r.data);
        return new ImageData(clonedData, r.width, r.height);
      })
    };
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
