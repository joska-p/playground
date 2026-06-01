import { pipelineGateway } from "../api/pipeline-gateway";
import type { PipelineContext, PipelineResult } from "./image-pipeline.types";
import type { Step } from "./manipulations/manifest";

type PipelineConfig = {
  context?: Partial<PipelineContext>;
  maxPixels?: number;
};

export class Pipeline {
  private steps: Step[] = [];
  private source: ImageData;
  private config: PipelineConfig;

  private constructor(source: ImageData, config: PipelineConfig = {}) {
    this.source = source;
    this.config = config;
  }

  static from(source: ImageData, config: PipelineConfig = {}) {
    return new Pipeline(source, config);
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
      sourceImageData: this.source,
      steps: this.steps,
      maxPixels: this.config.maxPixels,
    });
  }
}
