import { useEffect, useState } from "react";
import { ALL_MANIPULATIONS } from "../../core/manipulations/manifest";
import { runPipeline } from "../../core/pipeline-runner";
import { Registry } from "../../core/registry";
import { imageDataToUrl } from "./helpers";
import { DEMO_MANIPULATIONS } from "./manipData";

function CustomDemo({ sourceData }: { sourceData: ImageData | null }) {
  const [resultData, setResultData] = useState<ImageData | null>(null);
  const loading = sourceData !== null && resultData === null;

  useEffect(() => {
    if (!sourceData) return;
    let cancelled = false;

    const registry = Registry.from(ALL_MANIPULATIONS);
    for (const def of DEMO_MANIPULATIONS) registry.register(def);

    runPipeline(sourceData, [{ id: "demo-warm" }], { registry, maxPixels: 16_000_000 })
      .then((r) => {
        if (!cancelled) setResultData(r.final);
      })
      .catch(console.error);

    return () => {
      cancelled = true;
    };
  }, [sourceData]);

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
        <p className="text-muted-foreground mb-1 text-xs">Custom: warm filter</p>
        {loading ? (
          <div className="border-border flex aspect-square items-center justify-center rounded border text-xs opacity-50">
            ...
          </div>
        ) : resultData ? (
          <img
            src={imageDataToUrl(resultData)}
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
