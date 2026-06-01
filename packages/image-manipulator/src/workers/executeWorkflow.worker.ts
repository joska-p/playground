import { manipulate } from "../core/manipulate";
import { manipulations } from "../manipulations/manipulations";
import type { WorkflowStep } from "../store/workflowStore";

self.onmessage = function (e: MessageEvent<{ imageData: ImageData; workflow: WorkflowStep[] }>) {
  const { imageData, workflow } = e.data;
  const pipeline = manipulate(imageData);

  workflow.forEach((step: WorkflowStep) =>
    pipeline.apply(manipulations[step.id].callback(...Object.values(step.args)))
  );

  const results = pipeline.toArray();
  const buffers = results.map((img) => img.data.buffer);
  self.postMessage(results, { transfer: buffers });
};
