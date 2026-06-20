import { BufferManager } from './buffer-manager';
import { FusionScheduler } from './fusion-scheduler';
import type { Step } from './manipulations/manifest';
import { dispatchStep } from './step-dispatcher';
import type { PipelineContext } from './types';

function buildAutoDownscaleStep({
  source,
  steps,
  maximumPixels
}: {
  source: ImageData;
  steps: Step[];
  maximumPixels: number;
}) {
  if (
    steps.some((step) => step.id === 'resize') ||
    source.width * source.height <= maximumPixels
  ) {
    return null;
  }

  return {
    id: 'resize' as const,
    options: { maximumPixels }
  };
}

export async function runPipeline({
  source,
  steps,
  context
}: {
  source: ImageData;
  steps: Step[];
  context: PipelineContext;
}): Promise<ImageData[]> {
  const downscale = buildAutoDownscaleStep({
    source,
    steps,
    maximumPixels: context.maximumPixels
  });

  if (downscale) {
    console.warn(
      `[pixel-engine] Auto-scaling source image to within ${downscale.options.maximumPixels} pixels.`
    );
  }

  const effectiveSteps = downscale ? [downscale, ...steps] : steps;
  const snapshots: ImageData[] = [];
  const manager = new BufferManager(source);
  const scheduler = new FusionScheduler();

  for (const step of effectiveSteps) {
    dispatchStep({ step, context, bufferManager: manager, scheduler });
    scheduler.flush(manager);
    snapshots.push(manager.snapshot());
  }

  return snapshots;
}
