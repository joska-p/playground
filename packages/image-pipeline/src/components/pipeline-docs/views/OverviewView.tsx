import { CodeBlock } from '../CodeBlock';
import { imageDataToUrl } from '../helpers';

function OverviewView({ sourceData }: { sourceData: ImageData | null }) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black">
          <span className="text-primary">@repo/</span>image-pipeline
        </h1>
        <p className="text-muted-foreground mt-2 max-w-3xl text-base">
          TypeScript-first, browser-based image manipulation pipeline. Zero
          dependencies. Chain built-in manipulations into reusable pipelines.
          Runs off the main thread via a Web Worker pool for non-blocking UI.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="border-border bg-muted/30 border-t-utility-5 col-span-full flex flex-col gap-3 rounded-lg border border-t-2 p-6 lg:col-span-1">
          <h2 className="text-2xl font-bold">Why a Pipeline API?</h2>
          <p className="text-muted-foreground text-sm">
            Canvas 2D&apos;s built-in filters are limited, synchronous, and
            single-purpose. For anything beyond basic brightness or blur you
            need direct pixel access — which blocks the main thread. This
            pipeline gives you composable, off-thread image processing with
            near-zero overhead, and without leaving the browser.
          </p>
        </div>
        <div className="border-border bg-muted/30 border-t-utility-4 col-span-full flex flex-col gap-3 rounded-lg border border-t-2 p-6 lg:col-span-2">
          <h3 className="text-sm font-bold uppercase">Architecture</h3>
          <div className="grid gap-3 text-sm sm:grid-cols-3">
            <div>
              <div className="text-primary mb-1 font-semibold">Registry</div>
              <div className="text-muted-foreground space-y-0.5 text-xs">
                <div>.register(def)</div>
                <div>.get(id)</div>
                <div>.has(id)</div>
              </div>
            </div>
            <div>
              <div className="text-primary mb-1 font-semibold">Pipeline</div>
              <div className="text-muted-foreground space-y-0.5 text-xs">
                <div>.from(source, config?)</div>
                <div>.resize(options)</div>
                <div>.add(id, options?)</div>
                <div>.snapshot()</div>
                <div>.run()</div>
              </div>
            </div>
            <div>
              <div className="text-primary mb-1 font-semibold">Gateway</div>
              <div className="text-muted-foreground space-y-0.5 text-xs">
                <div>.run(&#123; sourceImageData, steps &#125;)</div>
                <div>.teardown()</div>
              </div>
            </div>
          </div>
          <p className="text-muted-foreground mt-2 text-xs">
            <strong>3 operation types:</strong> pixel (per-pixel transform),
            neighborhood (convolution kernel), global (dimension-changing
            transform).
          </p>
        </div>
      </div>

      <div className="border-border border-t-utility-1 rounded-lg border border-t-2 p-5">
        <h3 className="text-primary mb-3 text-sm font-bold uppercase">
          pipelineGateway (recommended)
        </h3>
        <p className="text-muted-foreground mb-3 text-sm">
          Offloads to a Web Worker pool (up to min(hardwareConcurrency, 4)).
          Built-in manipulations available automatically — no registry setup
          needed.
        </p>
        <CodeBlock
          code={`import { pipelineGateway } from "@repo/image-pipeline/api/pipeline-gateway";\n\nconst result = await pipelineGateway.run({\n  sourceImageData: sourceData,\n  steps: [\n    { id: "brightness", options: { value: 1.2 } },\n    { id: "sharpen", options: { strength: 1.5 } },\n    { id: "edge-detect" },\n  ]\n});\n\n// result[0]       → first step\n// result.at(-1)   → final result`}
        />
      </div>

      <div className="border-border border-t-utility-5 rounded-lg border border-t-2 p-5">
        <h3 className="text-primary mb-3 text-sm font-bold uppercase">
          Pipeline (builder API)
        </h3>
        <p className="text-muted-foreground mb-3 text-sm">
          Synchronous, chainable builder. Runs on whichever thread you call it
          from.
        </p>
        <CodeBlock
          code={`import { Pipeline } from "@repo/image-pipeline/core/pipeline";\n\nconst result = await Pipeline.from(sourceImageData, { maximumPixels: 16_000_000 })\n  .resize({ width: 800 })\n  .add("grayscale")\n  .snapshot()\n  .add("gaussian-blur", { radius: 3 })\n  .run();\n\n// result[0]       → resized + grayscale\n// result[1]       → grayscale mid-pipeline\n// result.at(-1)   → blurred grayscale`}
        />
      </div>

      <div className="border-border border-t-utility-2 rounded-lg border border-t-2 p-5">
        <h3 className="text-primary mb-3 text-sm font-bold uppercase">
          Registry — selective manipulation loading
        </h3>
        <p className="text-muted-foreground mb-3 text-sm">
          Pick only the manipulations you need from the manifest, build a custom
          Registry, and pass it directly to <code>runPipeline</code>. No unused
          code leaves the bundle.
        </p>
        <CodeBlock
          code={`import { Registry } from "@repo/image-pipeline/Registry";\nimport { runPipeline } from "@repo/image-pipeline/runPipeline";\nimport { ALL_MANIPULATIONS } from "@repo/image-pipeline/manipulations";\n\nconst myManips = ALL_MANIPULATIONS.filter(\n  (m) => m.id === "brightness" || m.id === "sharpen"\n);\n\nconst registry = Registry.from(myManips);\n\nconst result = await runPipeline({\n  source: sourceData,\n  steps: [\n    { id: "brightness", options: { value: 1.2 } },\n    { id: "sharpen", options: { strength: 2 } },\n  ],\n  context: { registry, maximumPixels: 16_000_000 },\n});\n// result is ImageData[] — same shape as pipelineGateway`}
        />
      </div>

      <div className="border-border border-t-utility-6 rounded-lg border border-t-2 p-5">
        <h3 className="text-primary mb-3 text-sm font-bold uppercase">
          usePipeline — React hook
        </h3>
        <p className="text-muted-foreground mb-3 text-sm">
          Thin <code>useEffect</code>/<code>useState</code> wrapper around
          <code className="mx-1">pipelineGateway.run()</code>. Re-runs whenever
          <code className="mx-1">sourceImageData</code> or
          <code className="mx-1">steps</code> change. Returns{' '}
          <code className="mx-1">ImageData[] | null</code> (null while loading).
        </p>
        <CodeBlock
          code={`import { usePipeline } from "@repo/image-pipeline/usePipeline";\n\nfunction Demo({ sourceData }: { sourceData: ImageData | null }) {\n  const result = usePipeline(sourceData, [\n    { id: "brightness", options: { value: 1.2 } },\n    { id: "sharpen", options: { strength: 1.5 } },\n  ]);\n\n  const finalImage = result?.at(-1) ?? null;\n  // ...render finalImage\n}`}
        />
      </div>

      {sourceData && (
        <div className="border-border bg-muted/30 border-l-utility-4 flex items-center gap-4 rounded-lg border border-l-2 p-4">
          <div className="w-20 shrink-0">
            <p className="text-muted-foreground mb-1 text-xs">Demo Image</p>
            <img
              src={imageDataToUrl(sourceData)}
              alt="demo"
              className="border-border w-full rounded border"
              style={{ imageRendering: 'pixelated' }}
            />
          </div>
          <p className="text-muted-foreground text-xs">
            All manipulations in this documentation run against this source
            image. Browse the sidebar to explore each endpoint.
          </p>
        </div>
      )}
    </div>
  );
}

export { OverviewView };
