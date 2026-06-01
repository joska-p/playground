import type {
  ManipulationDefinition,
  NeighborhoodFn,
  PipelineContext,
  ResizeOptions,
  Step,
  WholeImageFn,
} from "./image-pipeline.types";
import type { BufferManager } from "./buffer-manager";
import type { FusionScheduler } from "./fusion-scheduler";
import { computeTargetDimensions, resizeImageData } from "./image-resize";
import { runNeighborhoodTiled } from "./neighborhood-tiling";

type StepExecutionParams = {
  definition: ManipulationDefinition;
  options: Record<string, unknown>;
  context: PipelineContext;
  bufferManager: BufferManager;
  fusionScheduler: FusionScheduler;
};

type StepExecutor = (params: StepExecutionParams) => void;

function executeResizeStep(step: Step, bufferManager: BufferManager): void {
  const sourceImageData = bufferManager.asImageData();
  const targetDimensions = computeTargetDimensions(
    sourceImageData.width,
    sourceImageData.height,
    step.options as ResizeOptions
  );
  if (targetDimensions) {
    bufferManager.replaceWith(
      resizeImageData(sourceImageData, targetDimensions.width, targetDimensions.height)
    );
  }
}

// Pixel steps are cheap per-pixel operations — they are queued into the
// FusionScheduler to be batched and executed together for performance.
function schedulePixelStep({ definition, options, fusionScheduler }: StepExecutionParams): void {
  fusionScheduler.add(definition, options);
}

function executeNeighborhoodStep({
  definition,
  options,
  context,
  bufferManager,
  fusionScheduler,
}: StepExecutionParams): void {
  // Flush any pending pixel ops before reading the image, so neighborhood
  // operations always see a fully up-to-date buffer.
  fusionScheduler.flush(bufferManager);

  const sourceImageData = bufferManager.asImageData();

  // Tile the operation when the image exceeds the pixel budget to avoid memory blowout.
  if (sourceImageData.width * sourceImageData.height > context.maxPixels) {
    bufferManager.replaceWith(runNeighborhoodTiled(sourceImageData, definition, options));
  } else {
    const destinationBuffer = new Uint8ClampedArray(bufferManager.current.length);
    (definition.fn as NeighborhoodFn)(
      bufferManager.current,
      destinationBuffer,
      bufferManager.width,
      bufferManager.height,
      options
    );
    const outputImageData = new ImageData(bufferManager.width, bufferManager.height);
    outputImageData.data.set(destinationBuffer);
    bufferManager.replaceWith(outputImageData);
  }
}

function executeWholeImageStep({
  definition,
  options,
  bufferManager,
  fusionScheduler,
}: StepExecutionParams): void {
  // Flush any pending pixel ops before passing the full image to the manipulation function.
  fusionScheduler.flush(bufferManager);
  bufferManager.replaceWith((definition.fn as WholeImageFn)(bufferManager.asImageData(), options));
}

const stepExecutors: Record<string, StepExecutor> = {
  pixel: schedulePixelStep,
  neighborhood: executeNeighborhoodStep,
  whole: executeWholeImageStep,
};

export function dispatchStep(
  step: Step,
  context: PipelineContext,
  bufferManager: BufferManager,
  fusionScheduler: FusionScheduler
): void {
  if (step.id === "resize") {
    executeResizeStep(step, bufferManager);
    return;
  }

  const definition = context.registry.get(step.id);
  stepExecutors[definition.type]({
    definition,
    options: step.options ?? {},
    context,
    bufferManager,
    fusionScheduler,
  });
}
