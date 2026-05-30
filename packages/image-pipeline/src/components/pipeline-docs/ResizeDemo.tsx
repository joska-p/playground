import { Button } from "@repo/ui/Button";
import { useEffect, useMemo, useState } from "react";
import { Pipeline } from "../image-pipeline";
import { imageDataToUrl } from "./helpers";

function ResizeDemo({ sourceData }: { sourceData: ImageData | null }) {
  const [mode, setMode] = useState<string>("width");
  const [result, setResult] = useState<ImageData | null>(null);

  const modes = useMemo(
    () => [
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
    ],
    []
  );

  useEffect(() => {
    if (!sourceData) return;
    const m = modes.find((m) => m.id === mode);
    if (!m) return;
    Pipeline.from(sourceData)
      .resize(m.opts)
      .run()
      .then((r) => {
        setResult(r.final);
      });
  }, [sourceData, mode, modes]);

  const loading = sourceData !== null && result === null;
  const resultUrl = useMemo(() => (result ? imageDataToUrl(result) : null), [result]);
  const sourceUrl = useMemo(() => (sourceData ? imageDataToUrl(sourceData) : null), [sourceData]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {modes.map((m) => (
          <Button
            key={m.id}
            variant={mode === m.id ? "primary" : "outline"}
            size="small"
            onClick={() => setMode(m.id)}
          >
            {m.label}
          </Button>
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

export { ResizeDemo };
