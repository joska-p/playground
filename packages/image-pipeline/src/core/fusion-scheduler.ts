import type { BufferManager } from './buffer-manager';
import type { ManipulationDefinition } from './image-pipeline.types';

function runFusedPixelBatch({
  source,
  destination,
  pixelCount,
  batch,
}: {
  source: Uint8ClampedArray;
  destination: Uint8ClampedArray;
  pixelCount: number;
  batch: Array<{
    definition: ManipulationDefinition;
    options: Record<string, unknown>;
  }>;
}) {
  for (let i = 0; i < pixelCount; i++) {
    const offset = i * 4;
    let red = source[offset];
    let green = source[offset + 1];
    let blue = source[offset + 2];
    let alpha = source[offset + 3];

    for (const { definition, options } of batch) {
      if (definition.type === 'pixel') {
        [red, green, blue, alpha] = definition.function({
          options,
          red,
          green,
          blue,
          alpha,
        });
      }
    }

    destination[offset] = Math.max(0, Math.min(255, red));
    destination[offset + 1] = Math.max(0, Math.min(255, green));
    destination[offset + 2] = Math.max(0, Math.min(255, blue));
    destination[offset + 3] = Math.max(0, Math.min(255, alpha));
  }
}

export class FusionScheduler {
  private batch: Array<{
    definition: ManipulationDefinition;
    options: Record<string, unknown>;
  }> = [];

  add(definition: ManipulationDefinition, options: Record<string, unknown>) {
    this.batch.push({ definition, options });
  }

  flush(bufferManager: BufferManager) {
    if (this.batch.length === 0) return;

    runFusedPixelBatch({
      source: bufferManager.current,
      destination: bufferManager.other,
      pixelCount: bufferManager.width * bufferManager.height,
      batch: this.batch,
    });

    bufferManager.swap();
    this.batch.length = 0;
  }
}
