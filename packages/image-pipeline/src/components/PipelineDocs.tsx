import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Pipeline, registerManipulation } from "../api/index";

// ─── Constants ─────────────────────────────────────────────────────────────────

const CANVAS_SIZE = 200;

type ManipInfo = {
  id: string;
  label: string;
  type: "pixel" | "neighborhood" | "whole";
  params?: {
    key: string;
    label: string;
    min: number;
    max: number;
    step: number;
    default: number;
  }[];
  description: string;
};

const PIXEL_MANIPS: ManipInfo[] = [
  {
    id: "brightness",
    label: "Brightness",
    type: "pixel",
    description: "Multiply RGB channels by a value",
    params: [{ key: "value", label: "Amount", min: 0, max: 3, step: 0.05, default: 1.5 }],
  },
  {
    id: "contrast",
    label: "Contrast",
    type: "pixel",
    description: "Stretch or compress contrast around 50% gray",
    params: [{ key: "value", label: "Strength", min: 0, max: 3, step: 0.05, default: 1.5 }],
  },
  {
    id: "grayscale",
    label: "Grayscale",
    type: "pixel",
    description: "Convert to luminosity grayscale",
  },
  { id: "sepia", label: "Sepia", type: "pixel", description: "Classic sepia tone effect" },
  { id: "invert", label: "Invert", type: "pixel", description: "Invert all RGB channels" },
  {
    id: "saturation",
    label: "Saturation",
    type: "pixel",
    description: "Adjust color intensity",
    params: [{ key: "value", label: "Amount", min: 0, max: 3, step: 0.05, default: 0.3 }],
  },
  {
    id: "hue-rotate",
    label: "Hue Rotate",
    type: "pixel",
    description: "Rotate hues around the color wheel",
    params: [{ key: "degrees", label: "Degrees", min: 0, max: 360, step: 5, default: 180 }],
  },
  {
    id: "opacity",
    label: "Opacity",
    type: "pixel",
    description: "Multiply alpha channel",
    params: [{ key: "value", label: "Amount", min: 0, max: 1, step: 0.05, default: 0.5 }],
  },
  {
    id: "threshold",
    label: "Threshold",
    type: "pixel",
    description: "Binary black/white based on luminance threshold",
    params: [{ key: "threshold", label: "Level", min: 0, max: 255, step: 5, default: 128 }],
  },
];

const NEIGHBOR_MANIPS: ManipInfo[] = [
  {
    id: "gaussian-blur",
    label: "Gaussian Blur",
    type: "neighborhood",
    description: "Gaussian kernel blur",
    params: [{ key: "radius", label: "Radius", min: 1, max: 5, step: 1, default: 2 }],
  },
  {
    id: "box-blur",
    label: "Box Blur",
    type: "neighborhood",
    description: "Uniform kernel blur",
    params: [{ key: "radius", label: "Radius", min: 1, max: 5, step: 1, default: 2 }],
  },
  {
    id: "sharpen",
    label: "Sharpen",
    type: "neighborhood",
    description: "Laplacian unsharp mask",
    params: [{ key: "strength", label: "Strength", min: 0.5, max: 5, step: 0.5, default: 2 }],
  },
  {
    id: "edge-detect",
    label: "Edge Detect",
    type: "neighborhood",
    description: "Sobel operator edge detection",
  },
];

const WHOLE_MANIPS: ManipInfo[] = [
  {
    id: "histogram-equalize",
    label: "Histogram Equalize",
    type: "whole",
    description: "Equalize luminance histogram for contrast stretch",
  },
  {
    id: "flip-horizontal",
    label: "Flip Horizontal",
    type: "whole",
    description: "Mirror image left-to-right",
  },
  {
    id: "flip-vertical",
    label: "Flip Vertical",
    type: "whole",
    description: "Mirror image top-to-bottom",
  },
  {
    id: "rotate-90cw",
    label: "Rotate 90° CW",
    type: "whole",
    description: "Rotate 90 degrees clockwise",
  },
];

// Register a custom manipulation for the demo section
registerManipulation({
  id: "demo-warm",
  type: "pixel",
  fn: (r: number, g: number, b: number, a: number): [number, number, number, number] => [
    Math.min(255, r * 1.1),
    g * 0.85,
    b * 0.7,
    a,
  ],
});

// ─── Helpers ────────────────────────────────────────────────────────────────────

function generateTestImage(size: number): ImageData {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2;

  const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
  grad.addColorStop(0, "#ff6b6b");
  grad.addColorStop(0.2, "#feca57");
  grad.addColorStop(0.4, "#48dbfb");
  grad.addColorStop(0.6, "#54a0ff");
  grad.addColorStop(0.8, "#5f27cd");
  grad.addColorStop(1, "#222");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  ctx.fillStyle = "#ffffff";
  ctx.font = `bold ${size * 0.22}px sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("p5", cx, cy - size * 0.12);
  ctx.fillText("js", cx, cy + size * 0.12);

  ctx.strokeStyle = "rgba(255,255,255,0.5)";
  ctx.lineWidth = 3;
  ctx.strokeRect(size * 0.1, size * 0.1, size * 0.8, size * 0.8);

  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2;
    const x1 = cx;
    const y1 = cy;
    const x2 = cx + Math.cos(angle) * r * 0.9;
    const y2 = cy + Math.sin(angle) * r * 0.9;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = `hsla(${i * 60}, 80%, 60%, 0.3)`;
    ctx.stroke();
  }

  return ctx.getImageData(0, 0, size, size);
}

function imageDataToUrl(img: ImageData): string {
  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext("2d")!;
  ctx.putImageData(img, 0, 0);
  return canvas.toDataURL();
}

function CodeBlock({ code }: { code: string }): JSX.Element {
  return (
    <pre className="bg-muted/50 border-border overflow-x-auto rounded-lg border p-4 font-mono text-xs leading-relaxed">
      <code>{code}</code>
    </pre>
  );
}

function SectionHeader({ title, code }: { title: string; code: string }): JSX.Element {
  return (
    <div className="mb-6">
      <h2 className="mb-2 text-2xl font-bold">{title}</h2>
      <CodeBlock code={code} />
    </div>
  );
}

// ─── ManipCard ────────────────────────────────────────────────────────────────────

function ManipCard({
  manip,
  sourceData,
  params,
  onParamChange,
}: {
  manip: ManipInfo;
  sourceData: ImageData | null;
  params: Record<string, number>;
  onParamChange: (id: string, key: string, value: number) => void;
}): JSX.Element {
  const [result, setResult] = useState<ImageData | null>(null);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!sourceData) return;
    let cancelled = false;
    setRunning(true);

    const opts: Record<string, unknown> = {};
    if (manip.params) {
      for (const p of manip.params) {
        opts[p.key] = params[`${manip.id}:${p.key}`] ?? p.default;
      }
    }

    Pipeline.from(sourceData)
      .add(manip.id, opts)
      .run()
      .then((res) => {
        if (!cancelled) {
          setResult(res.final);
          setRunning(false);
        }
      })
      .catch(() => setRunning(false));

    return () => {
      cancelled = true;
    };
  }, [sourceData, manip.id, params]);

  const resultUrl = useMemo(() => (result ? imageDataToUrl(result) : null), [result]);
  const sourceUrl = useMemo(() => (sourceData ? imageDataToUrl(sourceData) : null), [sourceData]);

  const codeLines = [
    `Pipeline.from(source)`,
    `  .add("${manip.id}"${manip.params && manip.params.length > 0 ? ", { " + manip.params.map((p) => `${p.key}: ${params[`${manip.id}:${p.key}`] ?? p.default}`).join(", ") + " }" : ""})`,
    `  .run()`,
  ];

  return (
    <div className="border-border bg-card flex flex-col overflow-hidden rounded-xl border">
      <div className="border-border flex items-center justify-between border-b px-4 py-3">
        <span className="font-semibold">{manip.label}</span>
        <span className="text-muted-foreground text-xs">{manip.type}</span>
      </div>
      <div className="p-4">
        <p className="text-muted-foreground mb-3 text-xs">{manip.description}</p>
        <div className="mb-3 grid grid-cols-2 gap-2">
          <div>
            <p className="text-muted-foreground mb-1 text-[10px] uppercase tracking-wide">
              Original
            </p>
            {sourceUrl && (
              <img
                src={sourceUrl}
                alt="original"
                className="border-border w-full rounded border"
                style={{ imageRendering: "pixelated" }}
              />
            )}
          </div>
          <div>
            <p className="text-muted-foreground mb-1 text-[10px] uppercase tracking-wide">Result</p>
            {running ? (
              <div className="border-border flex aspect-square items-center justify-center rounded border text-xs opacity-50">
                ...
              </div>
            ) : resultUrl ? (
              <img
                src={resultUrl}
                alt={manip.label}
                className="border-border w-full rounded border"
                style={{ imageRendering: "pixelated" }}
              />
            ) : null}
          </div>
        </div>
        {manip.params &&
          manip.params.map((p) => (
            <div key={p.key} className="mb-2">
              <div className="mb-1 flex justify-between text-xs">
                <span>{p.label}</span>
                <span className="text-muted-foreground font-mono">
                  {params[`${manip.id}:${p.key}`] ?? p.default}
                </span>
              </div>
              <input
                type="range"
                min={p.min}
                max={p.max}
                step={p.step}
                value={params[`${manip.id}:${p.key}`] ?? p.default}
                onChange={(e) => onParamChange(manip.id, p.key, Number(e.target.value))}
                className="w-full accent-[var(--primary)]"
              />
            </div>
          ))}
        <details className="group">
          <summary className="text-muted-foreground cursor-pointer text-[10px] uppercase tracking-wide">
            Code
          </summary>
          <div className="mt-2">
            <CodeBlock code={codeLines.join("\n")} />
          </div>
        </details>
      </div>
    </div>
  );
}

// ─── Sub-demos ────────────────────────────────────────────────────────────────────

function SnapshotDemo({ sourceData }: { sourceData: ImageData | null }): JSX.Element {
  const [snapshots, setSnapshots] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState(false);
  const ranRef = useRef(false);

  useEffect(() => {
    if (!sourceData || ranRef.current) return;
    ranRef.current = true;
    setLoading(true);
    Pipeline.from(sourceData)
      .add("grayscale")
      .snapshot()
      .add("invert")
      .snapshot()
      .add("edge-detect")
      .run()
      .then((r) => {
        setSnapshots([...r.snapshots, r.final]);
        setLoading(false);
      });
  }, [sourceData]);

  const stages = ["After: grayscale", "After: invert", "After: edge-detect"];

  if (loading) {
    return <p className="text-muted-foreground text-sm">Running pipeline...</p>;
  }

  return (
    <div className="flex flex-wrap gap-6">
      {snapshots.map((snap, i) => (
        <div key={i} className="w-36">
          <p className="text-muted-foreground mb-1 text-xs">{stages[i] ?? `Step ${i + 1}`}</p>
          <img
            src={imageDataToUrl(snap)}
            alt={`snapshot ${i}`}
            className="border-border w-full rounded border"
            style={{ imageRendering: "pixelated" }}
          />
          <p className="text-muted-foreground mt-1 text-[10px] font-mono">
            {snap.width}×{snap.height}
          </p>
        </div>
      ))}
    </div>
  );
}

function ResizeDemo({ sourceData }: { sourceData: ImageData | null }): JSX.Element {
  const [mode, setMode] = useState<string>("width");
  const [result, setResult] = useState<ImageData | null>(null);
  const [loading, setLoading] = useState(false);

  const modes = [
    { id: "width", label: "Width (100px)", opts: { width: 100 } as const },
    { id: "height", label: "Height (100px)", opts: { height: 100 } as const },
    {
      id: "fill",
      label: "Fill (100×100)",
      opts: { width: 100, height: 100, fit: "fill" as const },
    },
    {
      id: "contain",
      label: "Contain (100×100)",
      opts: { width: 100, height: 100, fit: "contain" as const },
    },
    {
      id: "cover",
      label: "Cover (100×100)",
      opts: { width: 100, height: 100, fit: "cover" as const },
    },
    { id: "maxpixels", label: "Max Pixels (5000)", opts: { maxPixels: 5000 } as const },
  ];

  useEffect(() => {
    if (!sourceData) return;
    const m = modes.find((m) => m.id === mode);
    if (!m) return;
    setLoading(true);
    Pipeline.from(sourceData)
      .resize(m.opts)
      .run()
      .then((r) => {
        setResult(r.final);
        setLoading(false);
      });
  }, [sourceData, mode]);

  const resultUrl = useMemo(() => (result ? imageDataToUrl(result) : null), [result]);
  const sourceUrl = useMemo(() => (sourceData ? imageDataToUrl(sourceData) : null), [sourceData]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {modes.map((m) => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              mode === m.id
                ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>
      <div className="flex items-start gap-6">
        <div className="w-36">
          <p className="text-muted-foreground mb-1 text-xs">Original</p>
          {sourceUrl && (
            <img
              src={sourceUrl}
              alt="original"
              className="border-border w-full rounded border"
              style={{ imageRendering: "pixelated" }}
            />
          )}
          <p className="text-muted-foreground mt-1 text-[10px] font-mono">
            {sourceData?.width}×{sourceData?.height}
          </p>
        </div>
        <div className="w-36">
          <p className="text-muted-foreground mb-1 text-xs">Resized</p>
          {loading ? (
            <div className="border-border flex aspect-square items-center justify-center rounded border text-xs opacity-50">
              ...
            </div>
          ) : resultUrl ? (
            <img
              src={resultUrl}
              alt="resized"
              className="border-border w-full rounded border"
              style={{ imageRendering: "pixelated" }}
            />
          ) : null}
          <p className="text-muted-foreground mt-1 text-[10px] font-mono">
            {result?.width}×{result?.height}
          </p>
        </div>
      </div>
    </div>
  );
}

function ChainDemo({ sourceData }: { sourceData: ImageData | null }): JSX.Element {
  const [result, setResult] = useState<ImageData | null>(null);
  const [loading, setLoading] = useState(false);
  const ranRef = useRef(false);

  useEffect(() => {
    if (!sourceData || ranRef.current) return;
    ranRef.current = true;
    setLoading(true);
    Pipeline.from(sourceData)
      .add("brightness", { value: 1.2 })
      .add("contrast", { value: 1.3 })
      .add("sharpen", { strength: 1.5 })
      .run()
      .then((r) => {
        setResult(r.final);
        setLoading(false);
      });
  }, [sourceData]);

  const resultUrl = useMemo(() => (result ? imageDataToUrl(result) : null), [result]);
  const sourceUrl = useMemo(() => (sourceData ? imageDataToUrl(sourceData) : null), [sourceData]);

  return (
    <div className="flex flex-wrap items-start gap-6">
      <div className="w-36">
        <p className="text-muted-foreground mb-1 text-xs">Original</p>
        {sourceUrl && (
          <img
            src={sourceUrl}
            alt="original"
            className="border-border w-full rounded border"
            style={{ imageRendering: "pixelated" }}
          />
        )}
      </div>
      <div className="flex items-center self-center">
        <span className="text-muted-foreground text-2xl">→</span>
      </div>
      <div className="w-36">
        <p className="text-muted-foreground mb-1 text-xs">Brightness → Contrast → Sharpen</p>
        {loading ? (
          <div className="border-border flex aspect-square items-center justify-center rounded border text-xs opacity-50">
            ...
          </div>
        ) : resultUrl ? (
          <img
            src={resultUrl}
            alt="chained"
            className="border-border w-full rounded border"
            style={{ imageRendering: "pixelated" }}
          />
        ) : null}
      </div>
    </div>
  );
}

function CustomDemo({ sourceData }: { sourceData: ImageData | null }): JSX.Element {
  const [result, setResult] = useState<ImageData | null>(null);
  const [loading, setLoading] = useState(false);
  const ranRef = useRef(false);

  useEffect(() => {
    if (!sourceData || ranRef.current) return;
    ranRef.current = true;
    setLoading(true);
    Pipeline.from(sourceData)
      .add("demo-warm")
      .run()
      .then((r) => {
        setResult(r.final);
        setLoading(false);
      });
  }, [sourceData]);

  const resultUrl = useMemo(() => (result ? imageDataToUrl(result) : null), [result]);
  const sourceUrl = useMemo(() => (sourceData ? imageDataToUrl(sourceData) : null), [sourceData]);

  return (
    <div className="flex flex-wrap items-start gap-6">
      <div className="w-36">
        <p className="text-muted-foreground mb-1 text-xs">Original</p>
        {sourceUrl && (
          <img
            src={sourceUrl}
            alt="original"
            className="border-border w-full rounded border"
            style={{ imageRendering: "pixelated" }}
          />
        )}
      </div>
      <div className="flex items-center self-center">
        <span className="text-muted-foreground text-2xl">→</span>
      </div>
      <div className="w-36">
        <p className="text-muted-foreground mb-1 text-xs">Custom: warm filter</p>
        {loading ? (
          <div className="border-border flex aspect-square items-center justify-center rounded border text-xs opacity-50">
            ...
          </div>
        ) : resultUrl ? (
          <img
            src={resultUrl}
            alt="custom"
            className="border-border w-full rounded border"
            style={{ imageRendering: "pixelated" }}
          />
        ) : null}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────────

export function PipelineDocs(): JSX.Element {
  const [sourceData, setSourceData] = useState<ImageData | null>(null);
  const [params, setParams] = useState<Record<string, number>>({});

  useEffect(() => {
    const img = generateTestImage(CANVAS_SIZE);
    setSourceData(img);
  }, []);

  const handleParamChange = useCallback((id: string, key: string, value: number) => {
    setParams((prev) => ({ ...prev, [`${id}:${key}`]: value }));
  }, []);

  const sourceUrl = useMemo(() => (sourceData ? imageDataToUrl(sourceData) : null), [sourceData]);

  return (
    <div className="mx-auto max-w-6xl space-y-16 px-4 py-12">
      {/* Hero */}
      <div className="space-y-4">
        <h1 className="text-4xl font-black tracking-tight">
          <span className="text-[var(--primary)]">@repo/</span>image-pipeline
        </h1>
        <p className="text-muted-foreground max-w-3xl text-base leading-relaxed">
          TypeScript-first, browser-based image manipulation pipeline. Zero dependencies. Works in
          Node.js and the browser. Register custom manipulations and chain them into reusable
          pipelines.
        </p>
      </div>

      {/* Source Image */}
      <section>
        <SectionHeader
          title="Source Image"
          code={`const img = canvas.getImageData(0, 0, width, height);`}
        />
        <div className="flex items-start gap-6">
          <div className="w-48 shrink-0">
            <p className="text-muted-foreground mb-2 text-xs">
              Programmatically generated test image
            </p>
            {sourceUrl && (
              <img
                src={sourceUrl}
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
              code={`import { Pipeline } from "@repo/image-pipeline";\n\nconst result = await Pipeline\n  .from(imageData)\n  .add("grayscale")\n  .run();\n// result.final      → ImageData\n// result.snapshots  → ImageData[]`}
            />
          </div>
        </div>
      </section>

      {/* Pixel Manipulations */}
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

      {/* Neighborhood Manipulations */}
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

      {/* Whole Image Manipulations */}
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

      {/* Snapshots */}
      <section>
        <SectionHeader
          title="Snapshots"
          code={`Pipeline.from(source)\n  .add("grayscale")\n  .snapshot()\n  .add("invert")\n  .snapshot()\n  .add("edge-detect")\n  .run();`}
        />
        <SnapshotDemo sourceData={sourceData} />
      </section>

      {/* Resize */}
      <section>
        <SectionHeader
          title="Resize"
          code={`Pipeline.from(source).resize({ width: 100 }).run();`}
        />
        <ResizeDemo sourceData={sourceData} />
      </section>

      {/* Chaining */}
      <section>
        <SectionHeader
          title="Chaining & Composition"
          code={`const pipeline = Pipeline.from(source)\n  .resize({ maxPixels: 100_000 })\n  .add("brightness", { value: 1.2 })\n  .add("contrast", { value: 1.3 })\n  .add("sharpen", { strength: 1.5 });\n\nconst { final, snapshots } = await pipeline.run();`}
        />
        <ChainDemo sourceData={sourceData} />
      </section>

      {/* Custom Registration */}
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
