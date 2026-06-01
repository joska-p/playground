import type { BufferManager } from "./buffer-manager";
import type { FusionScheduler } from "./fusion-scheduler";
import type {
  ManipulationDefinition,
  PipelineContext,
  ResizeOptions,
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
  const source = bufferManager.snapshot();
  const dimensions = computeTargetDimensions({
    sourceWidth: source.width,
    sourceHeight: source.height,
    options,
  });

  if (dimensions) {
    bufferManager.replaceWith(
      resizeImageData({
        source: source,
        targetWidth: dimensions.width,
        targetHeight: dimensions.height,
      })
    );
  }
}

type ExecutorParameters = {
  definition: ManipulationDefinition;
  options: Record<string, unknown>;
  context: PipelineContext;
  manager: BufferManager;
  scheduler: FusionScheduler;
};

type ExecutorFunction = (parameters: ExecutorParameters) => void;

const executors: Record<string, ExecutorFunction> = {
  pixel: ({ definition, options, scheduler }) => {
    scheduler.add(definition, options);
  },

  neighborhood: ({ definition, options, context, manager, scheduler }) => {
    scheduler.flush(manager);
    const source = manager.snapshot();

    if (source.width * source.height > context.maxPixels) {
      manager.replaceWith(runNeighborhoodTiled({ source: source, definition, options }));
    } else {
      const destination = new Uint8ClampedArray(manager.current.length);

      if (definition.type === "neighborhood") {
        definition.function({
          options,
          source: manager.current,
          destination,
          width: manager.width,
          height: manager.height,
        });
      }

      const imageData = new ImageData(manager.width, manager.height);
      imageData.data.set(destination);
      manager.replaceWith(imageData);
    }
  },

  whole: ({ definition, options, manager, scheduler }) => {
    scheduler.flush(manager);
    if (definition.type === "whole") {
      manager.replaceWith(
        definition.function({
          options,
          imageData: manager.snapshot(),
        })
      );
    }
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

  const definition = context.registry.get(step.id);
  const options = (step as { options?: Record<string, unknown> }).options || {};

  const executor = executors[definition.type];
  if (executor) {
    executor({ definition, options, context, manager, scheduler });
  }
}
