import type { Step } from "../core/manipulations/manifest";
import { ALL_MANIPULATIONS } from "../core/manipulations/manifest";
import { MAX_PIXELS } from "../core/pipeline-config";
import { Registry } from "../core/registry";
import { runPipeline } from "../core/pipeline-runner";

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
    const { source, final, snapshots } = result;

    // Transfer all pixel buffers to avoid copying — each ImageData is
    // neutered on the worker side after postMessage returns, which is safe
    // because the worker never touches them again.
    const transferables: Transferable[] = [
      source.data.buffer,
      final.data.buffer,
      ...snapshots.map((snap) => snap.data.buffer),
    ];

    self.postMessage(result, { transfer: transferables });
  } catch (err) {
    // Surface pipeline errors back to the gateway's onerror handler
    self.postMessage({ error: err instanceof Error ? err.message : String(err) });
  }
});
