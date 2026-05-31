import { Button } from "@repo/ui/Button";
import { useState } from "react";
import { imageDataToUrl } from "./helpers";
import { usePipeline } from "./usePipeline";

const MODES = [
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
] as const;

function ResizeDemo({ sourceData }: { sourceData: ImageData | null }) {
  const [mode, setMode] = useState("width");
  const m = MODES.find((m) => m.id === mode)!;
  const result = usePipeline(sourceData, [{ kind: "manip", id: "resize", opts: m.opts }]);
  const resultImage = result?.final ?? null;
  const loading = sourceData !== null && result === null;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {MODES.map((m) => (
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
      <div className="flex flex-wrap items-start gap-4 sm:gap-6">
        <div className="w-28 sm:w-36">
          <p className="text-muted-foreground mb-1 text-xs">Original</p>
          {sourceData && (
            <img
              src={imageDataToUrl(sourceData)}
              alt="original"
              className="border-border w-full rounded border"
              style={{ imageRendering: "pixelated" }}
            />
          )}
          <p className="text-muted-foreground mt-1 text-[10px] font-mono">
            {sourceData?.width}×{sourceData?.height}
          </p>
        </div>
        <div className="w-28 sm:w-36">
          <p className="text-muted-foreground mb-1 text-xs">Resized</p>
          {loading ? (
            <div className="border-border flex aspect-square items-center justify-center rounded border text-xs opacity-50">
              ...
            </div>
          ) : resultImage ? (
            <img
              src={imageDataToUrl(resultImage)}
              alt="resized"
              className="border-border w-full rounded border"
              style={{ imageRendering: "pixelated" }}
            />
          ) : null}
          <p className="text-muted-foreground mt-1 text-[10px] font-mono">
            {resultImage?.width}×{resultImage?.height}
          </p>
        </div>
      </div>
    </div>
  );
}

export { ResizeDemo };
