import type { NeighborhoodFn, ResizeOptions, RunPipelineDeps, Step, WholeImageFn } from "../types";
import type { BufferManager } from "./buffer-manager";
import type { FusionScheduler } from "./fusion-scheduler";
import { computeTargetDimensions, resizeImageData } from "./resize";
import { runNeighborhoodTiled } from "./tiling";

export function dispatchStep(
  step: Step,
  deps: RunPipelineDeps,
  manager: BufferManager,
  scheduler: FusionScheduler
): void {
  if (step.kind === "manip") {
    if (step.id === "resize") {
      const src = manager.asImageData();
      const dims = computeTargetDimensions(src.width, src.height, step.opts as ResizeOptions);
      if (dims) {
        manager.replaceWith(resizeImageData(src, dims.width, dims.height));
      }
      return;
    }

    const def = deps.registry.get(step.id);

    if (def.type === "pixel") {
      scheduler.add(def, step.opts);
      return;
    }

    scheduler.flush(manager);

    if (def.type === "neighborhood") {
      const srcImg = manager.asImageData();
      if (srcImg.width * srcImg.height > deps.maxPixels) {
        manager.replaceWith(runNeighborhoodTiled(srcImg, def, step.opts));
      } else {
        const dest = new Uint8ClampedArray(manager.current.length);
        (def.fn as NeighborhoodFn)(manager.current, dest, manager.width, manager.height, step.opts);
        const result = new ImageData(manager.width, manager.height);
        result.data.set(dest);
        manager.replaceWith(result);
      }
      return;
    }

    if (def.type === "whole") {
      manager.replaceWith((def.fn as WholeImageFn)(manager.asImageData(), step.opts));
    }
  }
}
