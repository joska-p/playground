import { config } from "./config";
import { registry } from "./registry";
import { runNeighborhoodTiled } from "./tiling";
import type {
  ManipulationDefinition,
  NeighborhoodFn,
  PipelineResult,
  PixelFn,
  Step,
  WholeImageFn,
} from "./types";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function imageDataFromBuffer(buf: Uint8ClampedArray, width: number, height: number): ImageData {
  const out = new ImageData(width, height);
  out.data.set(buf);
  return out;
}

// ─── Fused pixel pass ─────────────────────────────────────────────────────────

function runFusedPixelBatch(
  src: Uint8ClampedArray,
  dest: Uint8ClampedArray,
  pixelCount: number,
  batch: Array<{ def: ManipulationDefinition; opts: Record<string, unknown> }>
): void {
  for (let i = 0; i < pixelCount; i++) {
    const off = i * 4;
    let r = src[off];
    let g = src[off + 1];
    let b = src[off + 2];
    let a = src[off + 3];

    for (const { def, opts } of batch) {
      [r, g, b, a] = (def.fn as PixelFn)(r, g, b, a, opts);
    }

    dest[off] = Math.max(0, Math.min(255, r));
    dest[off + 1] = Math.max(0, Math.min(255, g));
    dest[off + 2] = Math.max(0, Math.min(255, b));
    dest[off + 3] = Math.max(0, Math.min(255, a));
  }
}

// ─── Main runner ──────────────────────────────────────────────────────────────

export async function runPipeline(
  source: ImageData,
  steps: readonly Step[]
): Promise<PipelineResult> {
  const snapshots: ImageData[] = [];
  const width = source.width;
  const height = source.height;
  const pixelCount = width * height;

  // Ping-pong buffers
  const bufA = new Uint8ClampedArray(source.data);
  const bufB = new Uint8ClampedArray(pixelCount * 4);

  // Current "live" buffer pointer
  let current: Uint8ClampedArray = bufA;
  let other: Uint8ClampedArray = bufB;

  // For whole-image manipulations we may need a detached ImageData temporarily
  let currentWidth = width;
  let currentHeight = height;

  // Fused batch accumulator
  const pixelBatch: Array<{ def: ManipulationDefinition; opts: Record<string, unknown> }> = [];

  const flushPixelBatch = () => {
    if (pixelBatch.length === 0) return;
    runFusedPixelBatch(current, other, currentWidth * currentHeight, pixelBatch);
    [current, other] = [other, current];
    pixelBatch.length = 0;
  };

  const captureSnapshot = () => {
    snapshots.push(imageDataFromBuffer(current, currentWidth, currentHeight));
  };

  for (const step of steps) {
    if (step.kind === "snapshot") {
      // Flush pixel batch first so snapshot reflects all accumulated ops
      flushPixelBatch();
      captureSnapshot();
      continue;
    }

    // step.kind === 'manip'
    const def = registry.get(step.id);

    if (def.type === "pixel") {
      pixelBatch.push({ def, opts: step.opts });
      continue;
    }

    // Barrier — flush accumulated pixel ops first
    flushPixelBatch();

    if (def.type === "neighborhood") {
      const srcImg = imageDataFromBuffer(current, currentWidth, currentHeight);
      const exceedsThreshold = srcImg.width * srcImg.height > config.maxPixels;

      let resultImg: ImageData;
      if (exceedsThreshold) {
        resultImg = runNeighborhoodTiled(srcImg, def, step.opts);
      } else {
        const destBuf = new Uint8ClampedArray(current.length);
        (def.fn as NeighborhoodFn)(current, destBuf, currentWidth, currentHeight, step.opts);
        resultImg = imageDataFromBuffer(destBuf, currentWidth, currentHeight);
      }

      // Adopt new buffer — resize buffers if dimensions changed (they don't for neighborhood but be safe)
      current = new Uint8ClampedArray(resultImg.data);
      other = new Uint8ClampedArray(current.length);
      currentWidth = resultImg.width;
      currentHeight = resultImg.height;
      continue;
    }

    if (def.type === "whole") {
      const srcImg = imageDataFromBuffer(current, currentWidth, currentHeight);
      const resultImg = (def.fn as WholeImageFn)(srcImg, step.opts);

      current = new Uint8ClampedArray(resultImg.data);
      other = new Uint8ClampedArray(current.length);
      currentWidth = resultImg.width;
      currentHeight = resultImg.height;
      continue;
    }
  }

  // Flush any remaining pixel batch
  flushPixelBatch();

  const final = imageDataFromBuffer(current, currentWidth, currentHeight);
  return { final, snapshots };
}
