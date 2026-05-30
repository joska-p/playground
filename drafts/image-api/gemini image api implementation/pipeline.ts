// ============================================================================
// Types & Interfaces
// ============================================================================

export type PixelFn = (
  r: number,
  g: number,
  b: number,
  a: number,
  opts: Record<string, unknown>
) => [number, number, number, number];

export type NeighborhoodFn = (
  src: Uint8ClampedArray,
  dest: Uint8ClampedArray,
  width: number,
  height: number,
  opts: Record<string, unknown>
) => void;

export type WholeImageFn = (imageData: ImageData, opts: Record<string, unknown>) => ImageData;

export interface ManipulationDefinition {
  id: string;
  type: "pixel" | "neighborhood" | "whole";
  radius?: number;
  fn: PixelFn | NeighborhoodFn | WholeImageFn;
}

export type ResizeOptions =
  | { width: number; height?: never; maxPixels?: never }
  | { height: number; width?: never; maxPixels?: never }
  | { width: number; height: number; fit?: "fill" | "cover" | "contain"; maxPixels?: never }
  | { maxPixels: number; width?: never; height?: never };

export interface PipelineResult {
  final: ImageData;
  snapshots: ImageData[];
}

export interface PipelineConfig {
  maxPixels: number;
}

// ============================================================================
// Global Registry & Configuration
// ============================================================================

const registry = new Map<string, ManipulationDefinition>();

let config: PipelineConfig = {
  maxPixels: 16_000_000,
};

export function registerManipulation(def: ManipulationDefinition): void {
  if (def.type === "neighborhood" && typeof def.radius !== "number") {
    throw new Error(`Manipulation '${def.id}' of type 'neighborhood' requires a radius.`);
  }
  registry.set(def.id, def);
}

export function setConfig(newConfig: Partial<PipelineConfig>): void {
  config = { ...config, ...newConfig };
}

// ============================================================================
// Internal Execution Engine Types
// ============================================================================

type Step =
  | { type: "manipulation"; id: string; opts: Record<string, unknown> }
  | { type: "snapshot" };

type Stage =
  | {
      type: "pixel-batch";
      ops: { fn: PixelFn; opts: Record<string, unknown> }[];
      snapshotsAfter: number;
    }
  | {
      type: "neighborhood";
      fn: NeighborhoodFn;
      opts: Record<string, unknown>;
      snapshotsAfter: number;
    }
  | { type: "whole"; fn: WholeImageFn; opts: Record<string, unknown>; snapshotsAfter: number };

// ============================================================================
// The Pipeline Builder & Runner
// ============================================================================

export class Pipeline {
  private steps: Step[] = [];
  private resizeOpts?: ResizeOptions;

  private constructor(private readonly source: ImageData) {}

  static from(source: ImageData): Pipeline {
    return new Pipeline(source);
  }

  resize(opts: ResizeOptions): Pipeline {
    this.resizeOpts = opts;
    return this;
  }

  add(id: string, opts: Record<string, unknown> = {}): Pipeline {
    if (!registry.has(id)) {
      throw new Error(`Unregistered manipulation: ${id}`);
    }
    this.steps.push({ type: "manipulation", id, opts });
    return this;
  }

  snapshot(): Pipeline {
    this.steps.push({ type: "snapshot" });
    return this;
  }

  async run(): Promise<PipelineResult> {
    // 1. Process Resizing (Always runs first)
    let currentData = this.applyResizeIfNeeded(this.source);

    // 2. Tiling Check
    const totalPixels = currentData.width * currentData.height;
    if (totalPixels > config.maxPixels) {
      // Note: A full overlapping-halo tile engine is complex.
      // In a production scenario, this is where we slice `currentData` into smaller
      // ImageData chunks, run the stage pipeline on each, and stitch them back together.
      console.warn(
        `Image size (${totalPixels}px) exceeds maxPixels (${config.maxPixels}). Tiling required but omitted for brevity in this execution block.`
      );
    }

    // 3. Compile the Execution Plan (Fusion)
    const stages = this.compileStages();

    // 4. Execute the Stages (Ping-Pong Buffer Loop)
    let srcBuffer = new Uint8ClampedArray(currentData.data);
    let destBuffer = new Uint8ClampedArray(srcBuffer.length);
    let { width, height } = currentData;
    const snapshots: ImageData[] = [];

    const swapBuffers = () => {
      const temp = srcBuffer;
      srcBuffer = destBuffer;
      destBuffer = temp;
    };

    for (const stage of stages) {
      if (stage.type === "pixel-batch" && stage.ops.length > 0) {
        // FUSED PIXEL LOOP
        for (let i = 0; i < srcBuffer.length; i += 4) {
          let r = srcBuffer[i];
          let g = srcBuffer[i + 1];
          let b = srcBuffer[i + 2];
          let a = srcBuffer[i + 3];

          for (let j = 0; j < stage.ops.length; j++) {
            const op = stage.ops[j];
            [r, g, b, a] = op.fn(r, g, b, a, op.opts);
          }

          destBuffer[i] = r;
          destBuffer[i + 1] = g;
          destBuffer[i + 2] = b;
          destBuffer[i + 3] = a;
        }
        swapBuffers();
      } else if (stage.type === "neighborhood") {
        // FLUSH BARRIER: NEIGHBORHOOD
        stage.fn(srcBuffer, destBuffer, width, height, stage.opts);
        swapBuffers();
      } else if (stage.type === "whole") {
        // FLUSH BARRIER: WHOLE IMAGE
        const tempImg = new ImageData(srcBuffer, width, height);
        const resultImg = stage.fn(tempImg, stage.opts);

        width = resultImg.width;
        height = resultImg.height;
        srcBuffer = new Uint8ClampedArray(resultImg.data);
        destBuffer = new Uint8ClampedArray(srcBuffer.length); // Re-allocate ping-pong pair
      }

      // Handle explicit snapshots after stage completes
      for (let s = 0; s < stage.snapshotsAfter; s++) {
        snapshots.push(new ImageData(new Uint8ClampedArray(srcBuffer), width, height));
      }
    }

    return {
      final: new ImageData(srcBuffer, width, height),
      snapshots,
    };
  }

  // ============================================================================
  // Internal Helpers
  // ============================================================================

  /**
   * Translates linear, declarative steps into fused execution stages.
   */
  private compileStages(): Stage[] {
    const stages: Stage[] = [];
    let currentPixelBatch: Stage & { type: "pixel-batch" } = {
      type: "pixel-batch",
      ops: [],
      snapshotsAfter: 0,
    };

    const pushBatchIfNotEmpty = () => {
      if (currentPixelBatch.ops.length > 0 || currentPixelBatch.snapshotsAfter > 0) {
        stages.push(currentPixelBatch);
        currentPixelBatch = { type: "pixel-batch", ops: [], snapshotsAfter: 0 };
      }
    };

    for (const step of this.steps) {
      if (step.type === "snapshot") {
        if (currentPixelBatch.ops.length > 0) {
          currentPixelBatch.snapshotsAfter++;
        } else if (stages.length > 0) {
          stages[stages.length - 1].snapshotsAfter++;
        } else {
          // Edge case: snapshot called before any operations
          currentPixelBatch.snapshotsAfter++;
        }
        continue;
      }

      const def = registry.get(step.id)!;

      if (def.type === "pixel") {
        currentPixelBatch.ops.push({ fn: def.fn as PixelFn, opts: step.opts });
      } else {
        // Neighborhood or Whole image encountered -> Flush the barrier
        pushBatchIfNotEmpty();

        if (def.type === "neighborhood") {
          stages.push({
            type: "neighborhood",
            fn: def.fn as NeighborhoodFn,
            opts: step.opts,
            snapshotsAfter: 0,
          });
        } else if (def.type === "whole") {
          stages.push({
            type: "whole",
            fn: def.fn as WholeImageFn,
            opts: step.opts,
            snapshotsAfter: 0,
          });
        }
      }
    }

    pushBatchIfNotEmpty();
    return stages;
  }

  /**
   * Resizes the image utilizing browser-native Canvas APIs for fast bilinear interpolation.
   */
  private applyResizeIfNeeded(source: ImageData): ImageData {
    if (!this.resizeOpts) return source;

    let targetW = source.width;
    let targetH = source.height;
    const ratio = source.width / source.height;

    if (this.resizeOpts.maxPixels) {
      if (targetW * targetH > this.resizeOpts.maxPixels) {
        const scale = Math.sqrt(this.resizeOpts.maxPixels / (targetW * targetH));
        targetW = Math.floor(targetW * scale);
        targetH = Math.floor(targetH * scale);
      } else {
        return source; // No-op if already under limit
      }
    } else if (this.resizeOpts.width && !this.resizeOpts.height) {
      targetW = this.resizeOpts.width;
      targetH = Math.floor(targetW / ratio);
    } else if (this.resizeOpts.height && !this.resizeOpts.width) {
      targetH = this.resizeOpts.height;
      targetW = Math.floor(targetH * ratio);
    } else if (this.resizeOpts.width && this.resizeOpts.height) {
      targetW = this.resizeOpts.width;
      targetH = this.resizeOpts.height;
      // Note: 'fit' (cover/contain) logic would require coordinate cropping adjustments here.
    }

    // Fast browser-native resize using OffscreenCanvas
    const canvas = new OffscreenCanvas(targetW, targetH);
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Failed to get 2D context for resizing");

    // We must draw the ImageData to a temporary canvas first to scale it
    const tmpCanvas = new OffscreenCanvas(source.width, source.height);
    tmpCanvas.getContext("2d")!.putImageData(source, 0, 0);

    ctx.drawImage(tmpCanvas, 0, 0, targetW, targetH);
    return ctx.getImageData(0, 0, targetW, targetH);
  }
}
