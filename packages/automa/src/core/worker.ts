import { WORKER_MESSAGE_STEP } from './config.ts';
import { getRule } from './rules/registry.ts';
import { evolveGrid } from './step.ts';

let nextGrid: Uint8Array | undefined;

type StepRequest = {
  type: typeof WORKER_MESSAGE_STEP;
  grid: Uint8Array;
  cols: number;
  rows: number;
  ruleId: string;
};

type StepResponse = {
  type: typeof WORKER_MESSAGE_STEP;
  grid: Uint8Array;
};

self.onmessage = (e: MessageEvent<StepRequest>) => {
  const { type, grid, cols, rows, ruleId } = e.data;

  if (type !== WORKER_MESSAGE_STEP) return;

  const rule = getRule(ruleId);
  if (!rule) return;

  if (!nextGrid || nextGrid.length !== grid.length) {
    nextGrid = new Uint8Array(grid.length);
  }

  evolveGrid(grid, nextGrid, cols, rows, rule);

  (self as unknown as Worker).postMessage(
    { type: WORKER_MESSAGE_STEP, grid: nextGrid } satisfies StepResponse,
    { transfer: [nextGrid.buffer] }
  );

  nextGrid = undefined;
};
