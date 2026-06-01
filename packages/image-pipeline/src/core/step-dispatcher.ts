import type { BufferManager } from "./buffer-manager";
import type { FusionScheduler } from "./fusion-scheduler";
import type {
  ManipulationDefinition,
  NeighborhoodFn,
  PipelineContext,
  ResizeOptions,
  WholeImageFn,
} from "./image-pipeline.types";
import { computeTargetDimensions, resizeImageData } from "./image-resize";
import type { Step } from "./manipulations/manifest";
import { runNeighborhoodTiled } from "./neighborhood-tiling";

function executeResizeStep(options: ResizeOptions, bufferManager: BufferManager) {
  const source = bufferManager.snapshot();
  const dims = computeTargetDimensions(source.width, source.height, options);
  if (dims) {
    bufferManager.replaceWith(resizeImageData(source, dims.width, dims.height));
  }
}

type ExecutorFn = (
  def: ManipulationDefinition,
  options: Record<string, unknown>,
  context: PipelineContext,
  manager: BufferManager,
  scheduler: FusionScheduler
) => void;

const executors: Record<string, ExecutorFn> = {
  pixel: (def, options, _, __, scheduler) => {
    scheduler.add(def, options);
  },

  neighborhood: (def, options, ctx, manager, scheduler) => {
    scheduler.flush(manager);
    const source = manager.snapshot();

    if (source.width * source.height > ctx.maxPixels) {
      manager.replaceWith(runNeighborhoodTiled(source, def, options));
    } else {
      const dest = new Uint8ClampedArray(manager.current.length);
      (def.fn as NeighborhoodFn)(manager.current, dest, manager.width, manager.height, options);
      const img = new ImageData(manager.width, manager.height);
      img.data.set(dest);
      manager.replaceWith(img);
    }
  },

  whole: (def, options, _, manager, scheduler) => {
    scheduler.flush(manager);
    manager.replaceWith((def.fn as WholeImageFn)(manager.snapshot(), options));
  }
};

export function dispatchStep(
  step: Step,
  context: PipelineContext,
  manager: BufferManager,
  scheduler: FusionScheduler
) {
  if (step.id === "resize") {
    executeResizeStep((step as { options: ResizeOptions }).options, manager);
    return;
  }

  const def = context.registry.get(step.id);
  const options = (step as { options?: Record<string, unknown> }).options || {};
  
  executors[def.type](def, options, context, manager, scheduler);
}
