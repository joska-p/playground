import type { PipelineResult } from "./pipeline.worker";
import PipelineWorker from "./pipeline.worker?worker&inline";
import type { Step } from "./types";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type PoolEntry = {
  worker: Worker;
  busy: boolean;
};

type QueuedJob = {
  imageData: ImageData;
  steps: Step[];
  resolve: (result: PipelineResult) => void;
  reject: (error: Error) => void;
};

// ---------------------------------------------------------------------------
// Pool + queue
// ---------------------------------------------------------------------------

let pool: PoolEntry[] = [];
const jobQueue: QueuedJob[] = [];

function getPool(): PoolEntry[] {
  if (pool.length === 0) {
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

function dispatch(
  entry: PoolEntry,
  imageData: ImageData,
  steps: Step[],
  resolve: QueuedJob["resolve"],
  reject: QueuedJob["reject"]
): void {
  entry.busy = true;

  const onMessage = (event: MessageEvent<PipelineResult | { error: string }>) => {
    cleanup();
    if ("error" in event.data) {
      reject(new Error(event.data.error));
    } else {
      resolve(event.data);
    }
  };

  const onError = (error: ErrorEvent) => {
    cleanup();
    reject(new Error(error.message ?? "Unknown worker error"));
  };

  const cleanup = () => {
    entry.worker.removeEventListener("message", onMessage);
    entry.worker.removeEventListener("error", onError);
    entry.busy = false;
    drainQueue();
  };

  entry.worker.addEventListener("message", onMessage);
  entry.worker.addEventListener("error", onError);

  const clampedCopy = new Uint8ClampedArray(imageData.data);
  const imageDataCopy = new ImageData(clampedCopy, imageData.width, imageData.height);
  entry.worker.postMessage({ sourceData: imageDataCopy, steps }, [imageDataCopy.data.buffer]);
}

function drainQueue(): void {
  if (!jobQueue.length) return;
  const entry = acquireWorker();
  if (!entry) return;
  const job = jobQueue.shift()!;
  dispatch(entry, job.imageData, job.steps, job.resolve, job.reject);
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

function pipelineGateway(sourceImageData: ImageData, steps: Step[]): Promise<PipelineResult> {
  const entry = acquireWorker();

  if (entry) {
    return new Promise((resolve, reject) => {
      dispatch(entry, sourceImageData, steps, resolve, reject);
    });
  }

  // All workers busy — queue the job until a worker frees up
  return new Promise((resolve, reject) => {
    jobQueue.push({ imageData: sourceImageData, steps, resolve, reject });
  });
}

// ---------------------------------------------------------------------------
// Lifecycle
// ---------------------------------------------------------------------------

/** Terminate all workers and clear the queue. Call this on app teardown. */
function teardownWorkerPool(): void {
  jobQueue.length = 0;
  pool.forEach(({ worker }) => worker.terminate());
  pool = [];
}

export { pipelineGateway, teardownWorkerPool };
