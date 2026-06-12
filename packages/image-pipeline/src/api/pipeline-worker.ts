import { ALL_MANIPULATIONS, type Step } from '../core/manipulations/manifest';
import { runPipeline } from '../core/pipeline-runner';
import { Registry } from '../core/registry';

const DEFAULT_MAXIMUM_PIXELS = 16_000_000;

type WorkerMessage = {
  sourceImageData: ImageData;
  steps: Step[];
  maximumPixels?: number;
};

self.addEventListener('message', async (event: MessageEvent<WorkerMessage>) => {
  const { sourceImageData, steps, maximumPixels } = event.data;

  try {
    const registry = Registry.from(ALL_MANIPULATIONS);

    const pipelineResult = await runPipeline({
      source: sourceImageData,
      steps,
      context: {
        registry,
        maximumPixels: maximumPixels ?? DEFAULT_MAXIMUM_PIXELS
      }
    });

    const transferables = pipelineResult.map(
      (imageData) => imageData.data.buffer
    );

    self.postMessage(pipelineResult, { transfer: transferables });
  } catch (error) {
    self.postMessage({
      error: error instanceof Error ? error.message : String(error)
    });
  }
});
