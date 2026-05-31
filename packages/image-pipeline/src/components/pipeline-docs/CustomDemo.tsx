import { useEffect, useState } from "react";
import { Pipeline } from "../image-pipeline/api/pipeline";
import { Registry } from "../image-pipeline/registry/registry";
import { NEIGHBOR_MANIPULATIONS } from "../image-pipeline/registry/neighborhood";
import { PIXEL_MANIPULATIONS } from "../image-pipeline/registry/pixel";
import { WHOLE_MANIPULATIONS } from "../image-pipeline/registry/whole";
import { DEMO_MANIPULATIONS } from "./manipData";
import { imageDataToUrl } from "./helpers";

function CustomDemo({ sourceData }: { sourceData: ImageData | null }) {
  const [resultData, setResultData] = useState<ImageData | null>(null);
  const loading = sourceData !== null && resultData === null;

  useEffect(() => {
    if (!sourceData) return;
    let cancelled = false;

    const registry = new Registry();
    for (const def of PIXEL_MANIPULATIONS) registry.register(def);
    for (const def of NEIGHBOR_MANIPULATIONS) registry.register(def);
    for (const def of WHOLE_MANIPULATIONS) registry.register(def);
    for (const def of DEMO_MANIPULATIONS) registry.register(def);

    Pipeline.from(sourceData, { registry, maxPixels: 16_000_000 })
      .add("demo-warm")
      .run()
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
