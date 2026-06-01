import { BufferManager } from "./buffer-manager";
import { FusionScheduler } from "./fusion-scheduler";
import type { PipelineContext, PipelineResult } from "./image-pipeline.types";
import type { Step } from "./manipulations/manifest";
import { dispatchStep } from "./step-dispatcher";

export function buildAutoDownscaleStep(source: ImageData, steps: Step[], maxPixels: number) {
  if (steps.some((s) => s.id === "resize") || source.width * source.height <= maxPixels)
    return null;

  const scale = Math.sqrt(maxPixels / (source.width * source.height));
  return {
    id: "resize" as const,
    options: {
      width: Math.max(1, Math.round(source.width * scale)),
      height: Math.max(1, Math.round(source.height * scale)),
      fit: "fill" as const,
    },
  };
}

export async function runPipeline(
  source: ImageData,
  steps: Step[],
  context: PipelineContext
): Promise<PipelineResult> {
  const downscale = buildAutoDownscaleStep(source, steps, context.maxPixels);
  if (downscale) {
    console.warn(
      `[image-pipeline] Auto-scaled source image to ${downscale.options.width}×${downscale.options.height}.`
    );
  }

  const effectiveSteps = downscale ? [downscale, ...steps] : steps;
  const snapshots: ImageData[] = [];
  const manager = new BufferManager(source);
  const scheduler = new FusionScheduler();

  for (const step of effectiveSteps) {
    if (step.id === "snapshot") {
      scheduler.flush(manager);
      snapshots.push(manager.snapshot());
    } else {
      dispatchStep(step, context, manager, scheduler);
    }
  }

  scheduler.flush(manager);
  return { source, final: manager.snapshot(), snapshots };
}
