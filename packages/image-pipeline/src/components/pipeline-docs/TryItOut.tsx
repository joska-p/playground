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
  const [pipelineResultImage, setPipelineResultImage] = useState<ImageData | null>(null);

  const loading = sourceData !== null && pipelineResultImage === null;

  useEffect(() => {
    if (!sourceData) return;
    let cancelled = false;

    const options: Record<string, unknown> = {};
    if (manip.params) {
      for (const parameterDefinition of manip.params) {
        options[parameterDefinition.key] =
          paramValues[`${manip.id}:${parameterDefinition.key}`] ?? parameterDefinition.default;
      }
    }

    pipelineGateway
      .run({ sourceImageData: sourceData, steps: [{ id: manip.id, options }] })
      .then((pipelineResult) => {
        if (!cancelled) setPipelineResultImage(pipelineResult.final);
      })
      .catch((error) => {
        console.error(error);
        if (!cancelled) setPipelineResultImage(null);
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
          ) : pipelineResultImage ? (
            <img
              src={imageDataToUrl(pipelineResultImage)}
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
          {manip.params.map((parameterDefinition) => (
            <Slider
              key={parameterDefinition.key}
              label={parameterDefinition.label}
              min={parameterDefinition.min}
              max={parameterDefinition.max}
              step={parameterDefinition.step}
              value={
                paramValues[`${manip.id}:${parameterDefinition.key}`] ?? parameterDefinition.default
              }
              onChange={(value) => onParamChange(manip.id, parameterDefinition.key, value)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export { TryItOut };
