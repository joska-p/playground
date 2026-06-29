import type { Step } from '@repo/pixel-engine/manipulations/manifest';
import { ALL_MANIPULATIONS } from '@repo/pixel-engine/manipulations/manifest';
import { runPipeline } from '@repo/pixel-engine/pipeline-runner';
import { PixelData } from '@repo/pixel-engine/pixel-data';
import { Registry } from '@repo/pixel-engine/registry';

const DEFAULT_MAXIMUM_PIXELS = 16_000_000;

type WorkerMessage = {
  sourceImageData: { data: Uint8ClampedArray; width: number; height: number };
  steps: Step[];
  maximumPixels?: number;
};

self.addEventListener('message', async (event: MessageEvent<WorkerMessage>) => {
  const { sourceImageData, steps, maximumPixels } = event.data;

  try {
    const registry = Registry.from(ALL_MANIPULATIONS);
    const source = new PixelData(
      sourceImageData.width,
      sourceImageData.height,
      sourceImageData.data
    );

    const pipelineResult = await runPipeline({
      source,
      steps,
      context: {
        registry,
        maximumPixels: maximumPixels ?? DEFAULT_MAXIMUM_PIXELS
      }
    });

    const transferables = pipelineResult.map((pd) => pd.data.buffer);

    self.postMessage(pipelineResult, { transfer: transferables });
  } catch (error) {
    self.postMessage({
      error: error instanceof Error ? error.message : String(error)
    });
  }
});
