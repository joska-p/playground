import { BufferManager } from "./buffer-manager";
import { FusionScheduler } from "./fusion-scheduler";
import type { PipelineContext, PipelineResult, ResizeOptions } from "./image-pipeline.types";
import type { Step } from "./manipulations/manifest";
import { dispatchStep } from "./step-dispatcher";

export type { PipelineContext };

export function buildAutoDownscaleStep(
  source: ImageData,
  steps: Step[],
  maxPixels: number
): { id: "resize"; options: ResizeOptions } | null {
  const hasResize = steps.some((s) => s.id === "resize");
  if (hasResize) return null;

  const pixels = source.width * source.height;
  if (pixels <= maxPixels) return null;

  const scale = Math.sqrt(maxPixels / pixels);
  return {
    id: "resize",
    options: {
      width: Math.max(1, Math.round(source.width * scale)),
      height: Math.max(1, Math.round(source.height * scale)),
      fit: "fill",
    },
  };
}

export async function runPipeline(
  source: ImageData,
  steps: Step[],
  context: PipelineContext
): Promise<PipelineResult> {
  const downscaleGuard = buildAutoDownscaleStep(source, steps, context.maxPixels);
  if (downscaleGuard) {
    const { width, height } = downscaleGuard.options;
    console.warn(
      `[image-pipeline] Source image (${source.width}×${source.height}) ` +
        `exceeds maxPixels (${context.maxPixels}). Auto-scaled to ${width}×${height}.`
    );
  }
  const effectiveSteps = downscaleGuard ? [downscaleGuard, ...steps] : steps;

  const snapshots: ImageData[] = [];
  const manager = new BufferManager(source);
  const scheduler = new FusionScheduler();

  for (const step of effectiveSteps) {
    if (step.id === "snapshot") {
      scheduler.flush(manager);
      snapshots.push(manager.snapshot());
      continue;
    }
    dispatchStep(step, context, manager, scheduler);
  }

  scheduler.flush(manager);
  return { source, final: manager.snapshot(), snapshots };
}
