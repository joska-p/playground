import { WorkerPool } from '@repo/worker-pool';
import { evaluateNode } from '../tree/evaluate';
import type { ExpressionNode, RenderResult, RenderTask } from '../types';

const MAX_POOL_SIZE = 4;

let pool: WorkerPool<RenderTask, RenderResult> | null = null;

function getRenderPool(): WorkerPool<RenderTask, RenderResult> {
  if (!pool) {
    pool = new WorkerPool<RenderTask, RenderResult>({
      maxPoolSize: Math.min(
        navigator.hardwareConcurrency ?? MAX_POOL_SIZE,
        MAX_POOL_SIZE
      ),
      workerFactory: () =>
        new Worker(new URL('./render-worker', import.meta.url), {
          type: 'module'
        }),
      serialize: (task) => ({ message: task }),
      deserialize: (event) => {
        const data = event.data;
        if ('error' in data) {
          return { ok: false, error: new Error(String(data.error)) };
        }
        return { ok: true, value: data as RenderResult };
      }
    });
  }
  return pool;
}

function renderTreesToBuffer(
  treeR: ExpressionNode,
  treeG: ExpressionNode,
  treeB: ExpressionNode,
  size: number,
  time: number = 0
): Uint8ClampedArray {
  const buffer = new Uint8ClampedArray(size * size * 4);

  for (let py = 0; py < size; py++) {
    const y = (py / size) * 2 - 1;

    for (let px = 0; px < size; px++) {
      const x = (px / size) * 2 - 1;

      const r = Math.floor(((evaluateNode(treeR, x, y, time) + 1) / 2) * 255);
      const g = Math.floor(((evaluateNode(treeG, x, y, time) + 1) / 2) * 255);
      const b = Math.floor(((evaluateNode(treeB, x, y, time) + 1) / 2) * 255);

      const index = (py * size + px) * 4;
      buffer[index] = r;
      buffer[index + 1] = g;
      buffer[index + 2] = b;
      buffer[index + 3] = 255;
    }
  }

  return buffer;
}

const STRIP_HEIGHT = 64;

async function renderTreesToImageDataAsync(
  treeR: ExpressionNode,
  treeG: ExpressionNode,
  treeB: ExpressionNode,
  size: number,
  time: number = 0
): Promise<ImageData> {
  const renderPool = getRenderPool();
  const promises: Promise<RenderResult>[] = [];

  for (let rowStart = 0; rowStart < size; rowStart += STRIP_HEIGHT) {
    const rowEnd = Math.min(rowStart + STRIP_HEIGHT, size);
    promises.push(
      renderPool.run({ treeR, treeG, treeB, rowStart, rowEnd, size, time })
    );
  }

  const results = await Promise.all(promises);
  results.sort((a, b) => a.rowStart - b.rowStart);

  const imageData = new ImageData(size, size);
  let offset = 0;
  for (const result of results) {
    imageData.data.set(result.buffer, offset);
    offset += result.buffer.length;
  }

  return imageData;
}

export { renderTreesToBuffer, renderTreesToImageDataAsync };
