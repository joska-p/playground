import type { ManipulationDefinition, PixelFn } from "./image-pipeline.types";
import type { BufferManager } from "./buffer-manager";

function runFusedPixelBatch(
  src: Uint8ClampedArray,
  dest: Uint8ClampedArray,
  pixelCount: number,
  batch: Array<{ def: ManipulationDefinition; options: Record<string, unknown> }>
): void {
  for (let i = 0; i < pixelCount; i++) {
    const off = i * 4;
    let r = src[off];
    let g = src[off + 1];
    let b = src[off + 2];
    let a = src[off + 3];

    for (const { def, options } of batch) {
      [r, g, b, a] = (def.fn as PixelFn)(r, g, b, a, options);
    }

    dest[off] = Math.max(0, Math.min(255, r));
    dest[off + 1] = Math.max(0, Math.min(255, g));
    dest[off + 2] = Math.max(0, Math.min(255, b));
    dest[off + 3] = Math.max(0, Math.min(255, a));
  }
}

export class FusionScheduler {
  private batch: Array<{ def: ManipulationDefinition; options: Record<string, unknown> }> = [];

  add(def: ManipulationDefinition, options: Record<string, unknown>): void {
    this.batch.push({ def, options });
  }

  flush(manager: BufferManager): void {
    if (this.batch.length === 0) return;
    runFusedPixelBatch(manager.current, manager.other, manager.width * manager.height, this.batch);
    manager.swap();
    this.batch.length = 0;
  }
}
