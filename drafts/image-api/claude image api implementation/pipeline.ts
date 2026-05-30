import { ResizeOptions, PipelineResult, Step, PipelineConfig } from './types'
import { computeTargetDimensions, resizeImageData } from './resize'
import { runPipeline } from './runner'
import { registry } from './registry'
import { config } from './config'
import { ManipulationDefinition } from './types'

export class Pipeline {
  private readonly source: ImageData
  private resizeOpts: ResizeOptions | null = null
  private readonly steps: Step[] = []

  private constructor(source: ImageData) {
    // Never mutate the source
    this.source = source
  }

  /** Create a new pipeline from a browser ImageData object. */
  static from(source: ImageData): Pipeline {
    if (!(source instanceof ImageData)) {
      throw new TypeError('[image-pipeline] Pipeline.from() requires an ImageData instance')
    }
    return new Pipeline(source)
  }

  /**
   * Constrain dimensions before any manipulation runs.
   * Always executes first regardless of call position.
   */
  resize(opts: ResizeOptions): Pipeline {
    this.resizeOpts = opts
    return this
  }

  /**
   * Append a registered manipulation by ID.
   */
  add(id: string, opts: Record<string, unknown> = {}): Pipeline {
    this.steps.push({ kind: 'manip', id, opts })
    return this
  }

  /**
   * Insert an explicit capture point.
   * The current pixel state is appended to result.snapshots after this stage.
   */
  snapshot(): Pipeline {
    this.steps.push({ kind: 'snapshot' })
    return this
  }

  /**
   * Execute the pipeline and resolve with the result.
   */
  async run(): Promise<PipelineResult> {
    // Apply resize first (always, regardless of chain position)
    let src = this.source
    if (this.resizeOpts !== null) {
      const dims = computeTargetDimensions(src.width, src.height, this.resizeOpts)
      if (dims !== null) {
        src = resizeImageData(src, dims.width, dims.height)
      }
    } else {
      // Still honour global maxPixels safety guard even without explicit .resize()
      const pixels = src.width * src.height
      if (pixels > config.maxPixels) {
        const scale = Math.sqrt(config.maxPixels / pixels)
        const w = Math.max(1, Math.round(src.width * scale))
        const h = Math.max(1, Math.round(src.height * scale))
        src = resizeImageData(src, w, h)
        console.warn(
          `[image-pipeline] Source image (${this.source.width}×${this.source.height}) ` +
            `exceeds maxPixels (${config.maxPixels}). Auto-scaled to ${w}×${h}.`
        )
      }
    }

    return runPipeline(src, this.steps)
  }
}
