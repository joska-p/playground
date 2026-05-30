import { imageDataToUrl } from "./helpers";
import { usePipeline } from "./usePipeline";

const STEPS = [{ kind: "manip", id: "demo-warm", opts: {} }] as const;

function CustomDemo({ sourceData }: { sourceData: ImageData | null }) {
  const result = usePipeline(sourceData, STEPS);
  const resultImage = result?.final ?? null;
  const loading = sourceData !== null && result === null;

  return (
    <div className="flex flex-wrap items-start gap-6">
      <div className="w-36">
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
      <div className="flex items-center self-center">
        <span className="text-muted-foreground text-2xl">→</span>
      </div>
      <div className="w-36">
        <p className="text-muted-foreground mb-1 text-xs">Custom: warm filter</p>
        {loading ? (
          <div className="border-border flex aspect-square items-center justify-center rounded border text-xs opacity-50">
            ...
          </div>
        ) : resultImage ? (
          <img
            src={imageDataToUrl(resultImage)}
            alt="custom"
            className="border-border w-full rounded border"
            style={{ imageRendering: "pixelated" }}
          />
        ) : null}
      </div>
    </div>
  );
}

export { CustomDemo };
