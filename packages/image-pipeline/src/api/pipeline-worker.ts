import { ALL_MANIPULATIONS, type Step } from "../core/manipulations/manifest";
import { runPipeline } from "../core/pipeline-runner";
import { Registry } from "../core/registry";

const DEFAULT_MAXIMUM_PIXELS = 16_000_000;

export type PipelineResult = {
  source: ImageData;
  final: ImageData;
  snapshots: ImageData[];
};

type WorkerMessage = {
  sourceData: ImageData;
  steps: Step[];
  maxPixels?: number;
};

self.addEventListener("message", async (event: MessageEvent<WorkerMessage>) => {
  const { sourceData, steps, maxPixels } = event.data;

  try {
    const registry = Registry.from(ALL_MANIPULATIONS);

    const result = await runPipeline({
      source: sourceData,
      steps,
      context: {
        registry,
        maxPixels: maxPixels ?? DEFAULT_MAXIMUM_PIXELS,
      },
    });

    const transferables = [
      result.source.data.buffer,
      result.final.data.buffer,
      ...result.snapshots.map((snapshot) => snapshot.data.buffer),
    ];

    self.postMessage(result, { transfer: transferables });
  } catch (error) {
    self.postMessage({
      error: error instanceof Error ? error.message : String(error),
    });
  }
});
