import { Card } from '@repo/ui/Card';
import { ChainDemo } from './ChainDemo';
import { CodeBlock } from './CodeBlock';
import { imageDataToUrl } from './helpers';
import type { EndpointId, ManipInfo } from './manipData';
import {
  ENDPOINT_GROUPS,
  findItemForEndpoint,
  findManipById,
} from './manipData';
import { ParamTable } from './ParamTable';
import { ResizeDemo } from './ResizeDemo';

import { TryItOut } from './TryItOut';

const TYPE_ACCENT: Record<string, string> = {
  pixel: 'var(--utility-6)',
  neighborhood: 'var(--utility-3)',
  whole: 'var(--utility-2)',
  pipeline: 'var(--utility-1)',
  internals: 'var(--utility-8)',
  overview: 'var(--utility-4)',
};

type EndpointViewProps = {
  activeEndpoint: EndpointId;
  sourceData: ImageData | null;
  paramValues: Record<string, number>;
  onParamChange: (id: string, key: string, value: number) => void;
};

function ManipView({
  manip,
  sourceData,
  paramValues,
  onParamChange,
}: {
  manip: ManipInfo;
  sourceData: ImageData | null;
  paramValues: Record<string, number>;
  onParamChange: (id: string, key: string, value: number) => void;
}) {
  const codeLines = [
    `pipelineGateway.run({`,
    `  sourceImageData: source,`,
    `  steps: [`,
    `    { id: "${manip.id}"${
      manip.params && manip.params.length > 0
        ? ', options: { ' +
          manip.params
            .map(
              (p) =>
                `${p.key}: ${paramValues[`${manip.id}:${p.key}`] ?? p.default}`
            )
            .join(', ') +
          ' }'
        : ''
    } }`,
    `  ]`,
    `});`,
  ];

  return (
    <div
      className="space-y-6"
      style={
        {
          '--accent': TYPE_ACCENT[manip.type] ?? 'var(--utility-4)',
        } as React.CSSProperties
      }
    >
      <div className="flex items-center gap-3">
        <span className="bg-accent) inline-flex shrink-0 items-center rounded px-2 py-0.5 text-xs font-bold text-white uppercase">
          {manip.type === 'neighborhood'
            ? 'NEIGHBOR'
            : manip.type.toUpperCase()}
        </span>
        <h2 className="text-2xl font-bold">{manip.label}</h2>
      </div>
      <p className="text-muted-foreground max-w-2xl text-sm">
        {manip.description}
      </p>
      <p className="text-xs opacity-60">{manip.path}</p>

      <div className="border-border bg-muted/30 border-l-accent) max-w-2xl rounded-lg border border-l-2 p-4">
        <h3 className="mb-1.5 text-xs font-semibold uppercase">How It Works</h3>
        <p className="text-muted-foreground text-sm">{manip.longDescription}</p>
      </div>

      {manip.params && manip.params.length > 0 && (
        <section>
          <h3 className="mb-3 text-sm font-semibold uppercase">Parameters</h3>
          <ParamTable params={manip.params} />
        </section>
      )}

      <section>
        <h3 className="mb-3 inline-block border-b-2 border-b-(--accent) pb-1 text-sm font-semibold uppercase">
          Try It Out
        </h3>
        <Card>
          <div className="p-4">
            <TryItOut
              sourceData={sourceData}
              manip={manip}
              paramValues={paramValues}
              onParamChange={onParamChange}
            />
          </div>
        </Card>
      </section>

      <section>
        <h3 className="mb-3 inline-block border-b-2 border-b-(--accent) pb-1 text-sm font-semibold uppercase">
          Code Sample
        </h3>
        <CodeBlock code={codeLines.join('\n')} />
      </section>
    </div>
  );
}

function PipelineView({
  id,
  sourceData,
}: {
  id: 'resize' | 'chaining';
  sourceData: ImageData | null;
}) {
  const item = findItemForEndpoint(ENDPOINT_GROUPS, { kind: 'pipeline', id });
  const codeSamples: Record<string, string> = {
    resize: [
      `pipelineGateway.run({`,
      `  sourceImageData: source,`,
      `  steps: [`,
      `    { id: "resize", options: { width: 100 } }`,
      `  ]`,
      `});`,
    ].join('\n'),
    chaining: [
      `const result = await pipelineGateway.run({`,
      `  sourceImageData: source,`,
      `  steps: [`,
      `    { id: "brightness", options: { value: 1.2 } },`,
      `    { id: "contrast", options: { value: 1.3 } },`,
      `    { id: "sharpen", options: { strength: 1.5 } }`,
      `  ]`,
      `});`,
    ].join('\n'),
  };

  const demos: Record<
    string,
    (props: { sourceData: ImageData | null }) => React.JSX.Element
  > = {
    resize: ResizeDemo,
    chaining: ChainDemo,
  };

  const DemoComponent = demos[id];

  return (
    <div
      className="space-y-6"
      style={{ '--accent': 'var(--utility-1)' } as React.CSSProperties}
    >
      <div className="flex items-center gap-3">
        <span className="inline-flex shrink-0 items-center rounded bg-(--accent) px-2 py-0.5 text-xs font-bold text-white uppercase">
          PIPELINE
        </span>
        <h2 className="text-2xl font-bold">{item?.label ?? id}</h2>
      </div>
      <p className="text-muted-foreground max-w-2xl text-sm">
        {item?.description}
      </p>
      <p className="text-xs opacity-60">{item?.path}</p>

      {id === 'resize' && (
        <div className="border-border overflow-hidden rounded-lg border">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-muted/50 text-muted-foreground border-border border-b text-xs font-semibold uppercase">
                <th className="px-4 py-2.5">Option</th>
                <th className="px-4 py-2.5">Type</th>
                <th className="px-4 py-2.5">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-border border-b">
                <td className="text-primary px-4 py-2.5 text-xs">width</td>
                <td className="text-foreground/80 px-4 py-2.5 text-xs">
                  number
                </td>
                <td className="text-muted-foreground px-4 py-2.5 text-xs">
                  Target width. Height auto-proportional.
                </td>
              </tr>
              <tr className="border-border border-b">
                <td className="text-primary px-4 py-2.5 text-xs">height</td>
                <td className="text-foreground/80 px-4 py-2.5 text-xs">
                  number
                </td>
                <td className="text-muted-foreground px-4 py-2.5 text-xs">
                  Target height. Width auto-proportional.
                </td>
              </tr>
              <tr className="border-border border-b">
                <td className="text-primary px-4 py-2.5 text-xs">fit</td>
                <td className="text-foreground/80 px-4 py-2.5 text-xs">
                  string
                </td>
                <td className="text-muted-foreground px-4 py-2.5 text-xs">
                  fill | contain | cover. Default: fill
                </td>
              </tr>
              <tr className="border-border border-b">
                <td className="text-primary px-4 py-2.5 text-xs">
                  maximumPixels
                </td>
                <td className="text-foreground/80 px-4 py-2.5 text-xs">
                  number
                </td>
                <td className="text-muted-foreground px-4 py-2.5 text-xs">
                  Downscale to fit pixel budget, maintain aspect.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {id === 'chaining' && (
        <div className="border-border bg-muted/30 max-w-2xl rounded-lg border border-l-2 border-l-(--accent) p-4">
          <h3 className="mb-1.5 text-xs font-semibold uppercase">
            How Chaining Works
          </h3>
          <p className="text-muted-foreground text-sm">
            Steps execute in order. Consecutive pixel-type operations are fused
            into a single pass for performance. Neighborhood and whole-image ops
            flush pending pixel ops first. Use
            <code className="mx-1">snapshot</code> to capture intermediate
            results.
          </p>
        </div>
      )}

      <Card>
        <div className="p-4">
          <DemoComponent sourceData={sourceData} />
        </div>
      </Card>

      <section>
        <h3 className="mb-3 inline-block border-b-2 border-b-(--accent) pb-1 text-sm font-semibold uppercase">
          Code Sample
        </h3>
        <CodeBlock code={codeSamples[id]} />
      </section>
    </div>
  );
}

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
            neighborhood (convolution kernel), whole (dimension-changing
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

function InternalsView({ id }: { id: string }) {
  const item = findItemForEndpoint(ENDPOINT_GROUPS, { kind: 'internals', id });

  if (id === 'execution-engine') {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold">{item?.label}</h2>
        </div>
        <p className="text-muted-foreground max-w-2xl text-sm">
          {item?.description}
        </p>
        <p className="text-xs opacity-60">{item?.path}</p>

        <div className="border-border bg-muted/30 border-l-utility-8 rounded-lg border border-l-2 p-4 text-xs whitespace-pre">
          {`runPipeline({ source, steps, context })
  │
  ├── BufferManager(source)     ← double-buffered pixel arrays
  ├── FusionScheduler()         ← fuses consecutive pixel ops
  │
  └── for each step:
        ├── "snapshot"  → flush scheduler, clone buffer, store
        └── "manip"     → dispatchStep({ step, context, buffer, scheduler })
                            │
                            ├── resize    → computeTargetDimensions() + resizeImageData()
                            ├── pixel     → FusionScheduler.add() (deferred)
                            ├── neighbor  → flush scheduler, run convolution
                            │               (tiled if image > maximumPixels)
                            └── whole     → flush scheduler, run transform
  │
  └── final flush
  └── return { source, final, snapshots }`}
        </div>

        <div className="border-border bg-muted/30 border-l-utility-5 rounded-lg border border-l-2 p-4">
          <h3 className="mb-2 text-xs font-semibold uppercase">
            BufferManager
          </h3>
          <p className="text-muted-foreground text-sm">
            Double-buffering avoids allocating a new array for every pixel
            operation. Two
            <code className="mx-1">Uint8ClampedArray</code> buffers swap on each
            pass via O(1) pointer flip. <code className="mx-1">snapshot()</code>{' '}
            clones the current buffer into a new ImageData;{' '}
            <code className="mx-1">replaceWith()</code> resets both buffers when
            resize or whole-image ops change geometry.
          </p>
        </div>
      </div>
    );
  }

  if (id === 'fusion-scheduler') {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold">{item?.label}</h2>
        </div>
        <p className="text-muted-foreground max-w-2xl text-sm">
          {item?.description}
        </p>
        <p className="text-xs opacity-60">{item?.path}</p>

        <p className="text-muted-foreground text-sm">
          Consecutive pixel-type steps are fused into a single pixel loop to
          avoid N full-image passes. The scheduler queues pixel ops and runs
          them in one pass when flushed.
        </p>

        <div className="border-border bg-muted/30 border-l-utility-5 rounded-lg border border-l-2 p-4 text-xs whitespace-pre">
          {`For each pixel (i = 0 .. pixelCount-1):
  red,green,blue,alpha = current[i]
  for each (definition, options) in batch:
    [red,green,blue,alpha] = definition.function({ red, green, blue, alpha, options })
  other[i] = clamp(red,green,blue,alpha)
swap()`}
        </div>

        <p className="text-muted-foreground text-sm">
          Non-pixel operations (neighborhood, whole, resize, snapshot) force a
          flush before executing, ensuring pending pixel ops are applied first.
        </p>
      </div>
    );
  }

  if (id === 'tiling') {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold">{item?.label}</h2>
        </div>
        <p className="text-muted-foreground max-w-2xl text-sm">
          {item?.description}
        </p>
        <p className="text-xs opacity-60">{item?.path}</p>

        <p className="text-muted-foreground text-sm">
          Large neighborhood operations are tiled to avoid allocating full-size
          temporary buffers. Each tile includes a halo border of{' '}
          <code className="mx-1">radius</code> pixels so edge pixels have
          neighbors available.
        </p>

        <div className="border-border bg-muted/30 border-l-utility-3 rounded-lg border border-l-2 p-4 text-xs whitespace-pre">
          {`TILE_SIZE = 512 pixels per edge

For each tile:
  1. extractTile({ tileX, tileY, tileWidth, tileHeight, halo })
     → copies padded region clamped to image bounds
  2. run convolution on tile (with halo)
  3. blitTile({ destination, tile, tileX, tileY, tileWidth, tileHeight, halo })
     → writes only the non-halo center region back`}
        </div>

        <p className="text-muted-foreground text-sm">
          Peak memory drops from <code className="mx-1">(width × height)</code>{' '}
          to
          <code className="mx-1">(TILE_SIZE + 2×halo)²</code>. The result is
          identical to running convolution on the full image.
        </p>
      </div>
    );
  }

  if (id === 'resize-algorithm') {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold">{item?.label}</h2>
        </div>
        <p className="text-muted-foreground max-w-2xl text-sm">
          {item?.description}
        </p>
        <p className="text-xs opacity-60">{item?.path}</p>

        <p className="text-muted-foreground text-sm">
          Resize uses bilinear interpolation. For each output pixel, it samples
          the 4 nearest source pixels and interpolates.
        </p>

        <div className="border-border bg-muted/30 border-l-utility-4 rounded-lg border border-l-2 p-4 text-xs whitespace-pre">
          {`sourceX = x * (sourceWidth / targetWidth)
sourceY = y * (sourceHeight / targetHeight)

x0 = floor(sourceX), x1 = min(x0+1, sourceWidth-1)
y0 = floor(sourceY), y1 = min(y0+1, sourceHeight-1)

top    = source[x0,y0] * (1 - dx) + source[x1,y0] * dx
bottom = source[x0,y1] * (1 - dx) + source[x1,y1] * dx
output = top * (1 - dy) + bottom * dy`}
        </div>

        <div className="border-border overflow-hidden rounded-lg border">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-muted/50 text-muted-foreground border-border border-b text-xs font-semibold uppercase">
                <th className="px-4 py-2.5">Case</th>
                <th className="px-4 py-2.5">Result</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-border border-b">
                <td className="text-primary px-4 py-2.5 text-xs">
                  maximumPixels
                </td>
                <td className="text-muted-foreground px-4 py-2.5 text-xs">
                  Scale to fit pixel budget, aspect-ratio-preserved
                </td>
              </tr>
              <tr className="border-border border-b">
                <td className="text-primary px-4 py-2.5 text-xs">
                  width + height + fill
                </td>
                <td className="text-muted-foreground px-4 py-2.5 text-xs">
                  Exact dimensions (stretch)
                </td>
              </tr>
              <tr className="border-border border-b">
                <td className="text-primary px-4 py-2.5 text-xs">
                  width + height + contain
                </td>
                <td className="text-muted-foreground px-4 py-2.5 text-xs">
                  Fit within bounds, aspect-ratio-preserved
                </td>
              </tr>
              <tr className="border-border border-b">
                <td className="text-primary px-4 py-2.5 text-xs">
                  width + height + cover
                </td>
                <td className="text-muted-foreground px-4 py-2.5 text-xs">
                  Fill bounds, aspect-ratio-preserved (crops)
                </td>
              </tr>
              <tr className="border-border border-b">
                <td className="text-primary px-4 py-2.5 text-xs">width only</td>
                <td className="text-muted-foreground px-4 py-2.5 text-xs">
                  Scale proportionally by width
                </td>
              </tr>
              <tr className="border-border">
                <td className="text-primary px-4 py-2.5 text-xs">
                  height only
                </td>
                <td className="text-muted-foreground px-4 py-2.5 text-xs">
                  Scale proportionally by height
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (id === 'worker-architecture') {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold">{item?.label}</h2>
        </div>
        <p className="text-muted-foreground max-w-2xl text-sm">
          {item?.description}
        </p>
        <p className="text-xs opacity-60">{item?.path}</p>

        <div className="border-border bg-muted/30 border-l-utility-1 rounded-lg border border-l-2 p-4">
          <h3 className="mb-2 text-xs font-semibold uppercase">
            pipeline-worker.ts
          </h3>
          <p className="text-muted-foreground text-sm">
            Stateless worker. Each message rebuilds the registry from
            <code className="mx-1">ALL_MANIPULATIONS</code> and calls
            <code className="mx-1">runPipeline()</code>. Results are transferred
            back (zero-copy) via <code className="mx-1">postMessage</code>{' '}
            Transferables.
          </p>
        </div>

        <div className="border-border bg-muted/30 border-l-utility-6 rounded-lg border border-l-2 p-4">
          <h3 className="mb-2 text-xs font-semibold uppercase">
            pipeline-gateway.ts
          </h3>
          <p className="text-muted-foreground text-sm">
            Main-thread pool manager. Workers are lazily created on first call.
            If all workers are busy, jobs queue in FIFO order and dispatch as
            workers free up. Call
            <code className="mx-1">pipelineGateway.teardown()</code> on app
            unmount to terminate workers.
          </p>
          <div className="border-border bg-background mt-3 rounded border p-3 text-xs whitespace-pre">
            {`Pool:     up to min(hardwareConcurrency, 4) workers
Queue:    FIFO for overflow
Dispatch: postMessage with Transferable buffers
          (zero-copy pixel transfer)`}
          </div>
        </div>
      </div>
    );
  }

  if (id === 'configuration') {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold">{item?.label}</h2>
        </div>
        <p className="text-muted-foreground max-w-2xl text-sm">
          {item?.description}
        </p>
        <p className="text-xs opacity-60">{item?.path}</p>

        <div className="border-border overflow-hidden rounded-lg border">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-muted/50 text-muted-foreground border-border border-b text-xs font-semibold uppercase">
                <th className="px-4 py-2.5">Constant</th>
                <th className="px-4 py-2.5">Value</th>
                <th className="px-4 py-2.5">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-border">
                <td className="text-primary px-4 py-2.5 text-xs">
                  DEFAULT_MAXIMUM_PIXELS
                </td>
                <td className="text-foreground/80 px-4 py-2.5 text-xs">
                  16,000,000
                </td>
                <td className="text-muted-foreground px-4 py-2.5 text-xs">
                  ~16 megapixel default cap. Auto-downscale if source exceeds
                  this value. Also triggers tiled path for neighborhood ops.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="text-muted-foreground py-12 text-center text-sm">
      Section not found
    </div>
  );
}

function EndpointView({
  activeEndpoint,
  sourceData,
  paramValues,
  onParamChange,
}: EndpointViewProps) {
  if (activeEndpoint.kind === 'overview') {
    return <OverviewView sourceData={sourceData} />;
  }

  if (activeEndpoint.kind === 'pipeline') {
    return (
      <PipelineView
        id={activeEndpoint.id}
        sourceData={sourceData}
      />
    );
  }

  if (activeEndpoint.kind === 'internals') {
    return <InternalsView id={activeEndpoint.id} />;
  }

  const manip = findManipById(activeEndpoint.id);
  if (!manip) {
    return (
      <div className="text-muted-foreground py-12 text-center text-sm">
        Endpoint not found
      </div>
    );
  }

  return (
    <ManipView
      manip={manip}
      sourceData={sourceData}
      paramValues={paramValues}
      onParamChange={onParamChange}
    />
  );
}

export { EndpointView };
