import type { BufferManager } from "./buffer-manager";
import type { ManipulationDefinition, PixelFn } from "./image-pipeline.types";

function runFusedPixelBatch({
  src,
  dest,
  pixelCount,
  batch,
}: {
  src: Uint8ClampedArray;
  dest: Uint8ClampedArray;
  pixelCount: number;
  batch: Array<{ def: ManipulationDefinition; options: Record<string, unknown> }>;
}) {
  for (let i = 0; i < pixelCount; i++) {
    const off = i * 4;
    let r = src[off],
      g = src[off + 1],
      b = src[off + 2],
      a = src[off + 3];

    for (const { def, options } of batch) {
      [r, g, b, a] = (def.fn as PixelFn)(options, r, g, b, a);
    }

    dest[off] = Math.max(0, Math.min(255, r));
    dest[off + 1] = Math.max(0, Math.min(255, g));
    dest[off + 2] = Math.max(0, Math.min(255, b));
    dest[off + 3] = Math.max(0, Math.min(255, a));
  }
}

export class FusionScheduler {
  private batch: Array<{ def: ManipulationDefinition; options: Record<string, unknown> }> = [];

  add(def: ManipulationDefinition, options: Record<string, unknown>) {
    this.batch.push({ def, options });
  }

  flush(manager: BufferManager) {
    if (this.batch.length === 0) return;
    runFusedPixelBatch({
      src: manager.current,
      dest: manager.other,
      pixelCount: manager.width * manager.height,
      batch: this.batch,
    });
    manager.swap();
    this.batch.length = 0;
  }
}
