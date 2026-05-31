import type { PipelineResult, RunPipelineDeps, Step } from "../types";
import { BufferManager } from "./buffer-manager";
import { FusionScheduler } from "./fusion-scheduler";
import { dispatchStep } from "./step-dispatcher";

export type { RunPipelineDeps };

export async function runPipeline(
  source: ImageData,
  steps: readonly Step[],
  deps: RunPipelineDeps
): Promise<PipelineResult> {
  const snapshots: ImageData[] = [];
  const manager = new BufferManager(source);
  const scheduler = new FusionScheduler();

  for (const step of steps) {
    if (step.kind === "snapshot") {
      scheduler.flush(manager);
      snapshots.push(manager.snapshot());
      continue;
    }
    dispatchStep(step, deps, manager, scheduler);
  }

  scheduler.flush(manager);
  return { source, final: manager.snapshot(), snapshots };
}
