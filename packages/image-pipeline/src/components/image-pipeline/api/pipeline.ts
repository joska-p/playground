import { runPipeline, type RunPipelineDeps } from "../run/runner";
import type { PipelineResult, ResizeOptions, Step } from "../types";

export class Pipeline {
  private readonly source: ImageData;
  private readonly deps: RunPipelineDeps;
  private readonly steps: Step[] = [];

  private constructor(source: ImageData, deps: RunPipelineDeps) {
    this.source = source;
    this.deps = deps;
  }

  static from(source: ImageData, deps: RunPipelineDeps): Pipeline {
    if (!(source instanceof ImageData)) {
      throw new TypeError("[image-pipeline] Pipeline.from() requires an ImageData instance");
    }
    return new Pipeline(source, deps);
  }

  resize(opts: ResizeOptions): Pipeline {
    this.steps.push({ kind: "manip", id: "resize", opts });
    return this;
  }

  add(id: string, opts: Record<string, unknown> = {}): Pipeline {
    this.steps.push({ kind: "manip", id, opts });
    return this;
  }

  snapshot(): Pipeline {
    this.steps.push({ kind: "snapshot" });
    return this;
  }

  async run(): Promise<PipelineResult> {
    const hasResize = this.steps.some(
      (s): s is Step & { kind: "manip"; id: "resize" } => s.kind === "manip" && s.id === "resize"
    );
    if (!hasResize) {
      const pixels = this.source.width * this.source.height;
      if (pixels > this.deps.maxPixels) {
        const scale = Math.sqrt(this.deps.maxPixels / pixels);
        const w = Math.max(1, Math.round(this.source.width * scale));
        const h = Math.max(1, Math.round(this.source.height * scale));
        this.steps.unshift({
          kind: "manip",
          id: "resize",
          opts: { width: w, height: h, fit: "fill" },
        });
        console.warn(
          `[image-pipeline] Source image (${this.source.width}×${this.source.height}) ` +
            `exceeds maxPixels (${this.deps.maxPixels}). Auto-scaled to ${w}×${h}.`
        );
      }
    }

    return runPipeline(this.source, this.steps, this.deps);
  }
}
