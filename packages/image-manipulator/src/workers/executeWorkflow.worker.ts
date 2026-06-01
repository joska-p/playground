import { manipulate } from "../core/manipulate";
import { manipulations } from "../manipulations/manipulations";

self.onmessage = function (e) {
  const { imageData, workflow } = e.data;
  const pipeline = manipulate(imageData);
  workflow.forEach((step) =>
    pipeline.apply(manipulations[step.id].callback(...Object.values(step.args)))
  );
  self.postMessage(pipeline.toArray());
};
