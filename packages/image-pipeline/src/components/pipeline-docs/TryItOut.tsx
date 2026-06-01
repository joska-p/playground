import { Slider } from "@repo/ui/Slider";
import { useEffect, useState } from "react";
import { pipelineGateway } from "../../api/pipeline-gateway";
import { imageDataToUrl } from "./helpers";
import type { ManipInfo } from "./manipData";

type TryItOutProps = {
  sourceData: ImageData | null;
  manip: ManipInfo;
  paramValues: Record<string, number>;
  onParamChange: (id: string, key: string, value: number) => void;
};

function TryItOut({ sourceData, manip, paramValues, onParamChange }: TryItOutProps) {
  const [result, setResult] = useState<ImageData | null>(null);

  const loading = sourceData !== null && result === null;

  useEffect(() => {
    if (!sourceData) return;
    let cancelled = false;

    const options: Record<string, unknown> = {};
    if (manip.params) {
      for (const p of manip.params) {
        options[p.key] = paramValues[`${manip.id}:${p.key}`] ?? p.default;
      }
    }

    pipelineGateway
      .run(sourceData, [{ id: manip.id, options }])
      .then((r) => {
        if (!cancelled) setResult(r.final);
      })
      .catch((err) => {
        console.error(err);
        if (!cancelled) setResult(null);
      });

    return () => {
      cancelled = true;
    };
  }, [sourceData, manip.id, paramValues, manip.params]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-start gap-4 sm:gap-6">
        <div className="w-32 sm:w-40">
          <p className="text-muted-foreground mb-1 text-xs">Source</p>
          {sourceData && (
            <img
              src={imageDataToUrl(sourceData)}
              alt="source"
              className="border-border w-full rounded border"
              style={{ imageRendering: "pixelated" }}
            />
          )}
        </div>
        <div className="flex shrink-0 items-center self-center">
          <span className="text-muted-foreground text-xl">→</span>
        </div>
        <div className="w-32 sm:w-40">
          <p className="text-muted-foreground mb-1 text-xs">Result</p>
          {loading ? (
            <div className="border-border flex aspect-square items-center justify-center rounded border text-xs opacity-50">
              ...
            </div>
          ) : result ? (
            <img
              src={imageDataToUrl(result)}
              alt={manip.label}
              className="border-border w-full rounded border"
              style={{ imageRendering: "pixelated" }}
            />
          ) : (
            sourceData && (
              <div className="border-border flex aspect-square items-center justify-center rounded border text-xs opacity-50">
                —
              </div>
            )
          )}
        </div>
      </div>
      {manip.params && (
        <div className="space-y-2">
          {manip.params.map((p) => (
            <Slider
              key={p.key}
              label={p.label}
              min={p.min}
              max={p.max}
              step={p.step}
              value={paramValues[`${manip.id}:${p.key}`] ?? p.default}
              onChange={(v) => onParamChange(manip.id, p.key, v)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export { TryItOut };
