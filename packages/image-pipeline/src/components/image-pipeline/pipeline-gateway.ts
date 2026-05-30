import type { PipelineResult } from "./pipeline.worker";
import PipelineWorker from "./pipeline.worker?worker&inline";
import type { Step } from "./types";

// ---------------------------------------------------------------------------
// Worker pool
// ---------------------------------------------------------------------------
// One singleton worker serialises every job — request N blocks until request
// N-1 finishes.  A pool dispatches each job to the next idle worker, so
// heavy pipelines run concurrently up to the number of logical CPU cores.
// ---------------------------------------------------------------------------

type PoolEntry = {
  worker: Worker;
  busy: boolean;
};

let pool: PoolEntry[] = [];

function getPool(): PoolEntry[] {
  if (pool.length === 0) {
    // Cap at 4 so we don't thrash on machines with many cores
    const size = Math.min(navigator.hardwareConcurrency ?? 2, 4);
    pool = Array.from({ length: size }, () => ({
      worker: new PipelineWorker(),
      busy: false,
    }));
  }
  return pool;
}

function acquireWorker(): PoolEntry | null {
  return getPool().find((entry) => !entry.busy) ?? null;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

function pipelineGateway(sourceImageData: ImageData, steps: Step[]): Promise<PipelineResult> {
  return new Promise((resolve, reject) => {
    const entry = acquireWorker();

    if (!entry) {
      // All workers busy — caller should queue or debounce upstream
      reject(new Error("Pipeline worker pool exhausted. Retry after a pending job completes."));
      return;
    }

    entry.busy = true;

    const onMessage = (event: MessageEvent<PipelineResult>) => {
      cleanup();
      resolve(event.data);
    };

    const onError = (error: ErrorEvent) => {
      cleanup();
      reject(new Error(error.message ?? "Unknown worker error"));
    };

    const cleanup = () => {
      entry.worker.removeEventListener("message", onMessage);
      entry.worker.removeEventListener("error", onError);
      entry.busy = false;
    };

    entry.worker.addEventListener("message", onMessage);
    entry.worker.addEventListener("error", onError);

    // Transfer the buffer directly from the copy — not the intermediate
    // allocation.  Transferring `bufferCopy` after wrapping it in ImageData
    // detaches it before postMessage can serialise the ImageData payload.
    const clampedCopy = new Uint8ClampedArray(sourceImageData.data);
    const imageDataCopy = new ImageData(clampedCopy, sourceImageData.width, sourceImageData.height);

    entry.worker.postMessage({ sourceData: imageDataCopy, steps }, [imageDataCopy.data.buffer]);
  });
}

// ---------------------------------------------------------------------------
// Lifecycle
// ---------------------------------------------------------------------------

/** Terminate all workers. Call this on app teardown to avoid memory leaks. */
function teardownWorkerPool(): void {
  pool.forEach(({ worker }) => worker.terminate());
  pool = [];
}

export { pipelineGateway, teardownWorkerPool };
