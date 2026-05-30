import { Pipeline } from "./index";
import type { ResizeOptions, Step } from "./types";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type PipelineResult = {
  source: ImageData;
  final: ImageData;
  snapshots: ImageData[];
};

// ---------------------------------------------------------------------------
// Worker scope
// ---------------------------------------------------------------------------

self.addEventListener(
  "message",
  async (event: MessageEvent<{ sourceData: ImageData; steps: Step[] }>) => {
    const { sourceData, steps } = event.data;

    try {
      let pipeline = Pipeline.from(sourceData);

      for (const step of steps) {
        if (step.kind === "manip") {
          if (step.id === "resize") {
            pipeline = pipeline.resize(step.opts as unknown as ResizeOptions);
          } else {
            pipeline = pipeline.add(step.id, step.opts);
          }
        }
        // "snapshot" steps are intentionally a no-op here:
        // pipeline.run() collects snapshots internally at each stage.
      }

      const result: PipelineResult = await pipeline.run();
      const { source, final, snapshots } = result;

      // Transfer all pixel buffers to avoid copying — each ImageData is
      // neutered on the worker side after postMessage returns, which is safe
      // because the worker never touches them again.
      const transferables: Transferable[] = [
        source.data.buffer,
        final.data.buffer,
        ...snapshots.map((snap) => snap.data.buffer),
      ];

      self.postMessage(result, transferables);
    } catch (err) {
      // Surface pipeline errors back to the gateway's onerror handler
      self.postMessage({ error: err instanceof Error ? err.message : String(err) });
    }
  }
);
