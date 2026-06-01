import { ALL_MANIPULATIONS, type Step } from "../core/manipulations/manifest";
import { runPipeline } from "../core/pipeline-runner";
import { Registry } from "../core/registry";

const MAX_PIXELS = 16_000_000;

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

    const result = await runPipeline(sourceData, steps, {
      registry,
      maxPixels: maxPixels ?? MAX_PIXELS,
    });

    const transfer = [
      result.source.data.buffer,
      result.final.data.buffer,
      ...result.snapshots.map((s) => s.data.buffer),
    ];

    self.postMessage(result, { transfer });
  } catch (err) {
    self.postMessage({ error: err instanceof Error ? err.message : String(err) });
  }
});
