import { imageDataToUrl } from "./helpers";
import { usePipeline } from "./usePipeline";

const STEPS = [
  { id: "brightness", options: { value: 1.2 } },
  { id: "contrast", options: { value: 1.3 } },
  { id: "sharpen", options: { strength: 1.5 } },
] as const;

function ChainDemo({ sourceData }: { sourceData: ImageData | null }) {
  const result = usePipeline(sourceData, STEPS);
  const resultImage = result?.final ?? null;
  const loading = sourceData !== null && result === null;

  return (
    <div className="flex flex-wrap items-center gap-4 sm:gap-6">
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
      </div>
      <div className="flex shrink-0 items-center self-center">
        <span className="text-muted-foreground text-xl sm:text-2xl">→</span>
      </div>
      <div className="w-28 sm:w-36">
        <p className="text-muted-foreground mb-1 text-xs">Brightness → Contrast → Sharpen</p>
        {loading ? (
          <div className="border-border flex aspect-square items-center justify-center rounded border text-xs opacity-50">
            ...
          </div>
        ) : resultImage ? (
          <img
            src={imageDataToUrl(resultImage)}
            alt="chained"
            className="border-border w-full rounded border"
            style={{ imageRendering: "pixelated" }}
          />
        ) : null}
      </div>
    </div>
  );
}

export { ChainDemo };
