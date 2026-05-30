import { useEffect, useState } from "react";
import { ChainDemo } from "./ChainDemo";
import { CodeBlock } from "./CodeBlock";
import { CustomDemo } from "./CustomDemo";
import { imageDataToUrl, loadDemoImage } from "./helpers";
import { ManipCard } from "./ManipCard";
import { NEIGHBOR_MANIPS, PIXEL_MANIPS, WHOLE_MANIPS } from "./manipData";
import { ResizeDemo } from "./ResizeDemo";
import { SectionHeader } from "./SectionHeader";
import { SnapshotDemo } from "./SnapshotDemo";

const CANVAS_SIZE = 200;

export function PipelineDocs() {
  const [sourceData, setSourceData] = useState<ImageData | null>(null);
  const [params, setParams] = useState<Record<string, number>>({});

  useEffect(() => {
    let cancelled = false;
    loadDemoImage(CANVAS_SIZE).then((img) => {
      if (!cancelled) setSourceData(img);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  function handleParamChange(id: string, key: string, value: number) {
    setParams((prev) => ({ ...prev, [`${id}:${key}`]: value }));
  }

  return (
    <div className="mx-auto max-w-6xl space-y-16 px-4 py-12">
      <div className="space-y-4">
        <h1 className="text-4xl font-black tracking-tight">
          <span className="text-primary">@repo/</span>image-pipeline
        </h1>
        <p className="text-muted-foreground max-w-3xl text-base leading-relaxed">
          TypeScript-first, browser-based image manipulation pipeline. Zero dependencies. Register
          custom manipulations and chain them into reusable pipelines. Runs off the main thread via a
          Web Worker pool for non-blocking UI.
        </p>
      </div>

      <section>
        <SectionHeader
          title="Source Image"
          code={`const img = canvas.getImageData(0, 0, width, height);`}
        />
        <div className="flex items-start gap-6">
          <div className="w-48 shrink-0">
            <p className="text-muted-foreground mb-3 text-sm">demo image</p>
            {sourceData && (
              <img
                src={imageDataToUrl(sourceData)}
                alt="source"
                className="border-border w-full rounded-lg border"
                style={{ imageRendering: "pixelated" }}
              />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="mb-3 text-sm leading-relaxed">
              Each example runs a fresh pipeline against this source image. Manipulations are
              registered globally and referenced by string ID.
            </p>
            <CodeBlock
              code={`// --- Off-main-thread (recommended) ---\nimport { pipelineGateway } from "@repo/image-pipeline/imagePipelineGateway";\n\nconst result = await pipelineGateway(imageData, [\n  { kind: "manip", id: "grayscale", opts: {} },\n]);\n// result.final      → ImageData\n// result.snapshots  → ImageData[]\n\n// --- Main-thread (simple/direct) ---\nimport { Pipeline } from "@repo/image-pipeline";\n\nconst result = await Pipeline\n  .from(imageData)\n  .add("grayscale")\n  .run();`}
            />
          </div>
        </div>
      </section>

      <section>
        <SectionHeader
          title="Worker Pool"
          code={`pipelineGateway(imageData, steps);  // dispatches to pool\n\nteadownWorkerPool();              // lifecycle cleanup`}
        />
        <div className="max-w-3xl space-y-3 text-sm leading-relaxed">
          <p>
            Pipeline execution is offloaded to a pool of composited Web Workers. The{" "}
            <code className="text-primary bg-muted rounded px-1 py-0.5 text-xs font-mono">
              pipelineGateway
            </code>{" "}
            function acquires an idle worker from the pool or queues the job if all workers are
            busy. Workers are created lazily on first call, up to{" "}
            <code className="text-primary bg-muted rounded px-1 py-0.5 text-xs font-mono">
              min(navigator.hardwareConcurrency, 4)
            </code>
            .
          </p>
          <p>
            Each worker imports the <code className="text-primary bg-muted rounded px-1 py-0.5 text-xs font-mono">Pipeline</code> class and
            runs steps inside
            <code className="bg-muted rounded px-1 py-0.5 text-xs font-mono">pipeline.worker.ts</code>.
            Pixel buffers are transferred via <code className="text-primary bg-muted rounded px-1 py-0.5 text-xs font-mono">postMessage</code> with
            the <code className="bg-muted rounded px-1 py-0.5 text-xs font-mono">Transferable</code> flag — zero-copy, the source
            <code className="bg-muted rounded px-1 py-0.5 text-xs font-mono">ImageData</code> is neutered on the worker after sending.
          </p>
          <CodeBlock
            code={`import { pipelineGateway, teardownWorkerPool }\n  from "@repo/image-pipeline/imagePipelineGateway";\n\nconst result = await pipelineGateway(sourceData, [\n  { kind: "manip", id: "brightness", opts: { value: 1.5 } },\n  { kind: "snapshot" },\n  { kind: "manip", id: "sharpen", opts: { strength: 2 } },\n]);\n\n// result.final      → ImageData  (final output)\n// result.snapshots  → ImageData[] (captured mid-stages)\n\n// Clean up on app teardown:\nteardownWorkerPool();`}
          />
          <p className="text-muted-foreground text-xs">
            The demos below use <code className="rounded px-1 py-0.5 text-xs font-mono">usePipeline</code>, a thin React hook
            around <code className="rounded px-1 py-0.5 text-xs font-mono">pipelineGateway</code>.
          </p>
        </div>
      </section>

      <section>
        <SectionHeader
          title="Pixel Manipulations"
          code={`Pipeline.from(source).add("brightness", { value: 1.5 }).run();`}
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PIXEL_MANIPS.map((m) => (
            <ManipCard
              key={m.id}
              manip={m}
              sourceData={sourceData}
              params={params}
              onParamChange={handleParamChange}
            />
          ))}
        </div>
      </section>

      <section>
        <SectionHeader
          title="Neighborhood Manipulations"
          code={`Pipeline.from(source).add("gaussian-blur", { radius: 2 }).run();`}
        />
        <div className="grid gap-6 sm:grid-cols-2">
          {NEIGHBOR_MANIPS.map((m) => (
            <ManipCard
              key={m.id}
              manip={m}
              sourceData={sourceData}
              params={params}
              onParamChange={handleParamChange}
            />
          ))}
        </div>
      </section>

      <section>
        <SectionHeader
          title="Whole Image Manipulations"
          code={`Pipeline.from(source).add("flip-horizontal").run();`}
        />
        <div className="grid gap-6 sm:grid-cols-2">
          {WHOLE_MANIPS.map((m) => (
            <ManipCard
              key={m.id}
              manip={m}
              sourceData={sourceData}
              params={params}
              onParamChange={handleParamChange}
            />
          ))}
        </div>
      </section>

      <section>
        <SectionHeader
          title="Snapshots"
          code={`Pipeline.from(source)\n  .add("grayscale")\n  .snapshot()\n  .add("invert")\n  .snapshot()\n  .add("edge-detect")\n  .run();`}
        />
        <SnapshotDemo sourceData={sourceData} />
      </section>

      <section>
        <SectionHeader
          title="Resize"
          code={`Pipeline.from(source).resize({ width: 100 }).run();`}
        />
        <ResizeDemo sourceData={sourceData} />
      </section>

      <section>
        <SectionHeader
          title="Chaining & Composition"
          code={`const pipeline = Pipeline.from(source)\n  .resize({ maxPixels: 100_000 })\n  .add("brightness", { value: 1.2 })\n  .add("contrast", { value: 1.3 })\n  .add("sharpen", { strength: 1.5 });\n\nconst { source, final, snapshots } = await pipeline.run();`}
        />
        <ChainDemo sourceData={sourceData} />
      </section>

      <section>
        <SectionHeader
          title="Custom Manipulations"
          code={`import { registerManipulation } from "@repo/image-pipeline";\n\nregisterManipulation({\n  id: "my-effect",\n  type: "pixel",\n  fn: (r, g, b, a) => {\n    return [r * 1.1, g * 0.85, b * 0.7, a];\n  },\n});\n\nPipeline.from(source).add("my-effect").run();`}
        />
        <CustomDemo sourceData={sourceData} />
      </section>
    </div>
  );
}
