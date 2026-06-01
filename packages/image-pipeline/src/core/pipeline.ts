import { pipelineGateway } from "../api/pipeline-gateway";
import type { PipelineContext, PipelineResult } from "./image-pipeline.types";
import type { Step } from "./manipulations/manifest";

type PipelineConfiguration = {
  context?: Partial<PipelineContext>;
  maximumPixels?: number;
};

export class Pipeline {
  private steps: Step[] = [];
  private sourceImageData: ImageData;
  private configuration: PipelineConfiguration;

  private constructor(sourceImageData: ImageData, configuration: PipelineConfiguration = {}) {
    this.sourceImageData = sourceImageData;
    this.configuration = configuration;
  }

  static from(sourceImageData: ImageData, configuration: PipelineConfiguration = {}) {
    return new Pipeline(sourceImageData, configuration);
  }

  add(id: string, options?: Record<string, unknown>) {
    this.steps.push({ id, ...(options ? { options } : {}) } as Step);
    return this;
  }

  resize(options: Record<string, unknown>) {
    return this.add("resize", options);
  }

  snapshot() {
    this.steps.push({ id: "snapshot" });
    return this;
  }

  async run(): Promise<PipelineResult> {
    return pipelineGateway.run({
      sourceImageData: this.sourceImageData,
      steps: this.steps,
      maximumPixels: this.configuration.maximumPixels,
    });
  }
}
