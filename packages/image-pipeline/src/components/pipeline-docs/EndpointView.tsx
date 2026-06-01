import { Badge } from "@repo/ui/Badge";
import { Card } from "@repo/ui/Card";
import { ChainDemo } from "./ChainDemo";
import { CodeBlock } from "./CodeBlock";
import { CustomDemo } from "./CustomDemo";
import { imageDataToUrl } from "./helpers";
import type { EndpointId, ManipInfo } from "./manipData";
import { ENDPOINT_GROUPS, findItemForEndpoint, findManipById } from "./manipData";
import { ParamTable } from "./ParamTable";
import { ResizeDemo } from "./ResizeDemo";
import { SnapshotDemo } from "./SnapshotDemo";
import { TryItOut } from "./TryItOut";

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
    `pipelineGateway(source, [`,
    `  { id: "${manip.id}"${
      manip.params && manip.params.length > 0
        ? ", options: { " +
          manip.params
            .map((p) => `${p.key}: ${paramValues[`${manip.id}:${p.key}`] ?? p.default}`)
            .join(", ") +
          " }"
        : ""
    }`,
    `]);`,
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Badge
          variant={
            manip.type === "pixel"
              ? "secondary"
              : manip.type === "neighborhood"
                ? "accent"
                : "outline"
          }
        >
          {manip.type.toUpperCase()}
        </Badge>
        <h2 className="text-2xl font-bold">{manip.label}</h2>
      </div>
      <p className="text-muted-foreground max-w-2xl text-sm">{manip.description}</p>
      <p className="font-mono text-xs opacity-60">{manip.path}</p>

      {manip.params && manip.params.length > 0 && (
        <section>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider">Parameters</h3>
          <ParamTable params={manip.params} />
        </section>
      )}

      <section>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider">Try It Out</h3>
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
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider">Code Sample</h3>
        <CodeBlock code={codeLines.join("\n")} />
      </section>
    </div>
  );
}

function PipelineView({
  id,
  sourceData,
}: {
  id: "snapshots" | "resize" | "chaining" | "custom";
  sourceData: ImageData | null;
}) {
  const item = findItemForEndpoint(ENDPOINT_GROUPS, { kind: "pipeline", id });
  const codeSamples: Record<string, string> = {
    snapshots: [
      `pipelineGateway(source, [`,
      `  { id: "grayscale" },`,
      `  { id: "snapshot" },`,
      `  { id: "invert" },`,
      `  { id: "snapshot" },`,
      `  { id: "edge-detect" },`,
      `]);`,
    ].join("\n"),
    resize: [
      `pipelineGateway(source, [`,
      `  { id: "resize", options: { width: 100 } },`,
      `]);`,
    ].join("\n"),
    chaining: [
      `const result = await pipelineGateway(source, [`,
      `  { id: "brightness", options: { value: 1.2 } },`,
      `  { id: "contrast", options: { value: 1.3 } },`,
      `  { id: "sharpen", options: { strength: 1.5 } },`,
      `]);`,
    ].join("\n"),
    custom: [
      `import { Registry } from "@repo/image-pipeline/Registry";`,
      `import { definePixel } from "@repo/image-pipeline/definePixel";`,
      ``,
      `const registry = new Registry();`,
      `registry.register(`,
      `  definePixel("my-effect", (r, g, b, a) => [r * 1.1, g * 0.85, b * 0.7, a]),`,
      `);`,
      ``,
      `const result = await Pipeline`,
      `  .from(source, { registry, maxPixels: 250_000 })`,
      `  .add("my-effect")`,
      `  .run();`,
    ].join("\n"),
  };

  const demos: Record<string, (props: { sourceData: ImageData | null }) => React.JSX.Element> = {
    snapshots: SnapshotDemo,
    resize: ResizeDemo,
    chaining: ChainDemo,
    custom: CustomDemo,
  };

  const DemoComponent = demos[id];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Badge variant="primary">PIPELINE</Badge>
        <h2 className="text-2xl font-bold">{item?.label ?? id}</h2>
      </div>
      <p className="text-muted-foreground max-w-2xl text-sm">{item?.description}</p>
      <p className="font-mono text-xs opacity-60">{item?.path}</p>

      <Card>
        <div className="p-4">
          <DemoComponent sourceData={sourceData} />
        </div>
      </Card>

      <section>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider">Code Sample</h3>
        <CodeBlock code={codeSamples[id]} />
      </section>
    </div>
  );
}

function OverviewView({ sourceData }: { sourceData: ImageData | null }) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black tracking-tight">
          <span className="text-primary">@repo/</span>image-pipeline
        </h1>
        <p className="text-muted-foreground mt-2 max-w-3xl text-base leading-relaxed">
          TypeScript-first, browser-based image manipulation pipeline. Zero dependencies. Register
          custom manipulations and chain them into reusable pipelines. Runs off the main thread via
          a Web Worker pool for non-blocking UI.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="border-border bg-muted/30 col-span-full flex flex-col gap-3 rounded-lg border p-6 lg:col-span-1">
          <h2 className="text-2xl font-bold">Why a Pipeline API?</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Canvas 2D&apos;s built-in filters are limited, synchronous, and single-purpose. For
            anything beyond basic brightness or blur you need direct pixel access — which blocks the
            main thread. This pipeline gives you composable, off-thread image processing with
            near-zero overhead, and without leaving the browser.
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
                <div>.from(src, context)</div>
                <div>.add(id, options?)</div>
                <div>.resize(options)</div>
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

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="border-border rounded-lg border p-5">
          <h3 className="text-primary mb-3 text-sm font-bold uppercase tracking-wider">
            pipelineGateway (recommended)
          </h3>
          <p className="text-muted-foreground mb-3 text-sm leading-relaxed">
            Most apps. Offloads to workers, manages pool lifecycle. Built-in manipulations available
            automatically — no registry setup needed.
          </p>
          <CodeBlock
            code={`import { pipelineGateway } from "@repo/image-pipeline/PipelineGateway";\n\nconst result = await pipelineGateway(sourceData, [\n  { id: "brightness", options: { value: 1.2 } },\n  { id: "sharpen", options: { strength: 1.5 } },\n  { id: "snapshot" },\n  { id: "edge-detect" },\n]);\n\n// result.final      → ImageData\n// result.snapshots  → ImageData[]`}
          />
        </div>
        <div className="border-border rounded-lg border p-5">
          <h3 className="text-primary mb-3 text-sm font-bold uppercase tracking-wider">
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

      {sourceData && (
        <div className="border-border bg-muted/30 flex items-center gap-4 rounded-lg border p-4">
          <div className="w-20 shrink-0">
            <p className="text-muted-foreground mb-1 text-xs">Demo Image</p>
            <img
              src={imageDataToUrl(sourceData)}
              alt="demo"
              className="border-border w-full rounded border"
              style={{ imageRendering: "pixelated" }}
            />
          </div>
          <p className="text-muted-foreground text-xs leading-relaxed">
            All manipulations in this documentation run against this source image. Browse the
            sidebar to explore each endpoint.
          </p>
        </div>
      )}
    </div>
  );
}

function EndpointView({
  activeEndpoint,
  sourceData,
  paramValues,
  onParamChange,
}: EndpointViewProps) {
  if (activeEndpoint.kind === "overview") {
    return <OverviewView sourceData={sourceData} />;
  }

  if (activeEndpoint.kind === "pipeline") {
    return <PipelineView id={activeEndpoint.id} sourceData={sourceData} />;
  }

  const manip = findManipById(activeEndpoint.id);
  if (!manip) {
    return (
      <div className="text-muted-foreground py-12 text-center text-sm">Endpoint not found</div>
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
