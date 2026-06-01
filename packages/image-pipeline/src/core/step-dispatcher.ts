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

function executeResizeStep({
  options,
  bufferManager,
}: {
  options: ResizeOptions;
  bufferManager: BufferManager;
}) {
  const src = bufferManager.snapshot();
  const dims = computeTargetDimensions({ srcW: src.width, srcH: src.height, options });
  if (dims) {
    bufferManager.replaceWith(resizeImageData({ src, targetW: dims.width, targetH: dims.height }));
  }
}

type ExecutorParams = {
  def: ManipulationDefinition;
  options: Record<string, unknown>;
  context: PipelineContext;
  manager: BufferManager;
  scheduler: FusionScheduler;
};

type ExecutorFn = (params: ExecutorParams) => void;

const executors: Record<string, ExecutorFn> = {
  pixel: ({ def, options, scheduler }) => {
    scheduler.add(def, options);
  },

  neighborhood: ({ def, options, context, manager, scheduler }) => {
    scheduler.flush(manager);
    const src = manager.snapshot();

    if (src.width * src.height > context.maxPixels) {
      manager.replaceWith(runNeighborhoodTiled({ src, def, options }));
    } else {
      const dest = new Uint8ClampedArray(manager.current.length);
      (def.fn as NeighborhoodFn)(manager.current, dest, manager.width, manager.height, options);
      const img = new ImageData(manager.width, manager.height);
      img.data.set(dest);
      manager.replaceWith(img);
    }
  },

  whole: ({ def, options, manager, scheduler }) => {
    scheduler.flush(manager);
    manager.replaceWith((def.fn as WholeImageFn)(manager.snapshot(), options));
  },
};

export function dispatchStep({
  step,
  context,
  manager,
  scheduler,
}: {
  step: Step;
  context: PipelineContext;
  manager: BufferManager;
  scheduler: FusionScheduler;
}) {
  if (step.id === "resize") {
    executeResizeStep({
      options: (step as { options: ResizeOptions }).options,
      bufferManager: manager,
    });
    return;
  }

  const def = context.registry.get(step.id);
  const options = (step as { options?: Record<string, unknown> }).options || {};

  executors[def.type]({ def, options, context, manager, scheduler });
}
