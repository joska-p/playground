import type { PipelineResult, ResizeOptions } from "../core/image-pipeline.types";
import type { Step } from "../core/manipulations/manifest";
import { runPipeline, type PipelineContext } from "../core/pipeline-runner";

export class Pipeline {
  private readonly source: ImageData;
  private readonly context: PipelineContext;
  private readonly steps: Step[] = [];

  private constructor(source: ImageData, context: PipelineContext) {
    this.source = source;
    this.context = context;
  }

  static from(source: ImageData, context: PipelineContext): Pipeline {
    if (!(source instanceof ImageData)) {
      throw new TypeError("[image-pipeline] Pipeline.from() requires an ImageData instance");
    }
    return new Pipeline(source, context);
  }

  resize(options: ResizeOptions): Pipeline {
    this.steps.push({ id: "resize", options });
    return this;
  }

  add(id: string, options: Record<string, unknown> = {}): Pipeline {
    this.steps.push({ id, options });
    return this;
  }

  snapshot(): Pipeline {
    this.steps.push({ id: "snapshot" });
    return this;
  }

  async run(): Promise<PipelineResult> {
    return runPipeline(this.source, this.steps, this.context);
  }
}
