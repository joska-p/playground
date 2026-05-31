import { CodeBlock } from "./CodeBlock";

const FEATURES = [
  {
    title: "Off-Main-Thread",
    desc: "Pipeline execution offloaded to a composited Web Worker pool. UI stays responsive during heavy processing.",
    detail: "Workers created lazily, up to min(navigator.hardwareConcurrency, 4). Jobs queue when all workers busy.",
  },
  {
    title: "Zero-Copy Transfer",
    desc: "Pixel buffers transferred via postMessage with the Transferable flag. No serialization, no copying — just pointer handoff between threads.",
    detail: "Source ImageData neutered on the worker after send; safe because the worker never touches it again.",
  },
  {
    title: "Pixel Fusion",
    desc: "Consecutive per-pixel manipulations fuse into a single pass over the buffer. Intermediate results stay in L1 cache instead of round-tripping through memory.",
    detail: "Three sequential pixel ops run in one loop instead of three — dramatically less memory bandwidth.",
  },
  {
    title: "Composable Steps",
    desc: "Chain manipulations, insert snapshots, resize at any point. Same step array works with both worker (pipelineGateway) and main-thread (Pipeline) execution.",
    detail: "Fluent builder API for code, declarative arrays for dynamic or serialized pipelines.",
  },
  {
    title: "Extensible Registry",
    desc: "Built-in manipulations (brightness, blur, edge-detect, flip, etc.) are just pre-registered plugins. Register your own pixel, neighborhood, or whole-image functions.",
    detail: "Interface is identical for built-in and custom — no special-casing.",
  },
  {
    title: "Type-Safe Steps",
    desc: "Full TypeScript with discriminated unions for pipeline steps. The ResizeOptions type uses a disjoint union — invalid combinations are compile-time errors, not runtime crashes.",
    detail: "Zero runtime cost from the type system. No validation overhead in hot loops.",
  },
];

function ApiShowcase() {
  return (
    <section>
      <div className="mb-8 grid gap-6 lg:grid-cols-3">
        <div className="border-border bg-muted/30 col-span-full flex flex-col gap-3 rounded-lg border p-6 lg:col-span-1">
          <h2 className="text-2xl font-bold">Why a Pipeline API?</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Canvas 2D's built-in filters are limited, synchronous, and single-purpose. For anything
            beyond basic brightness or blur you need direct pixel access — which blocks the main
            thread. This pipeline gives you composable, off-thread image processing with near-zero
            overhead, and without leaving the browser.
          </p>
        </div>
        <div className="border-border bg-muted/30 col-span-full flex flex-col gap-3 rounded-lg border p-6 lg:col-span-2">
          <h3 className="text-sm font-bold uppercase tracking-wider">Architecture</h3>
          <div className="grid gap-3 text-sm sm:grid-cols-3">
            <div>
              <div className="text-primary mb-1 font-semibold">Registry</div>
              <div className="text-muted-foreground space-y-0.5 font-mono text-xs">
                <div>.register(def)</div>
                <div>.get(id)</div>
                <div>.has(id)</div>
              </div>
            </div>
            <div>
              <div className="text-primary mb-1 font-semibold">Pipeline</div>
              <div className="text-muted-foreground space-y-0.5 font-mono text-xs">
                <div>.from(src, deps)</div>
                <div>.add(id, opts?)</div>
                <div>.resize(opts)</div>
                <div>.snapshot()</div>
                <div>.run()</div>
              </div>
            </div>
            <div>
              <div className="text-primary mb-1 font-semibold">Gateway</div>
              <div className="text-muted-foreground space-y-0.5 font-mono text-xs">
                <div>pipelineGateway(src, steps)</div>
                <div>teardownWorkerPool()</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f) => (
          <div
            key={f.title}
            className="border-border bg-muted/30 flex flex-col gap-2 rounded-lg border p-5"
          >
            <h3 className="text-primary text-sm font-bold uppercase tracking-wider">{f.title}</h3>
            <p className="text-sm leading-relaxed">{f.desc}</p>
            <p className="text-muted-foreground mt-auto text-xs italic">{f.detail}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="border-border rounded-lg border p-5">
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wider">
            pipelineGateway (recommended)
          </h3>
          <p className="text-muted-foreground mb-3 text-sm leading-relaxed">
            Most apps. Offloads to workers, manages pool lifecycle. Built-in manipulations
            available automatically — no registry setup needed.
          </p>
          <CodeBlock
            code={`import { pipelineGateway } from "@repo/image-pipeline/PipelineGateway";\n\nconst result = await pipelineGateway(sourceData, [\n  { kind: "manip", id: "brightness", opts: { value: 1.2 } },\n  { kind: "manip", id: "sharpen", opts: { strength: 1.5 } },\n  { kind: "snapshot" },\n  { kind: "manip", id: "edge-detect", opts: {} },\n]);\n\n// result.final      → ImageData\n// result.snapshots  → ImageData[]`}
          />
        </div>
        <div className="border-border rounded-lg border p-5">
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wider">
            Pipeline (custom control)
          </h3>
          <p className="text-muted-foreground mb-3 text-sm leading-relaxed">
            Custom registry, main-thread execution, or embedding in your own worker. Requires
            explicit registry and config.
          </p>
          <CodeBlock
            code={`import { Pipeline } from "@repo/image-pipeline/Pipeline";\nimport { Registry } from "@repo/image-pipeline/Registry";\n\nconst registry = new Registry();\nregistry.register({\n  id: "my-effect",\n  type: "pixel",\n  fn: (r, g, b, a) => [r * 1.1, g * 0.85, b * 0.7, a],\n});\n\nconst result = await Pipeline\n  .from(sourceData, { registry, maxPixels: 250_000 })\n  .add("brightness", { value: 1.2 })\n  .add("my-effect")\n  .snapshot()\n  .run();`}
          />
        </div>
      </div>
    </section>
  );
}

export { ApiShowcase };
