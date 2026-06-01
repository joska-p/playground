import { useEffect, useState } from "react";
import { pipelineGateway } from "../../api/pipeline-gateway";
import type { PipelineResult } from "../../core/image-pipeline.types";
import type { Step } from "../../core/manipulations/manifest";

export function defineSteps<const T extends readonly Step[]>(steps: T): T {
  return steps;
}

export function usePipeline<const T extends readonly Step[]>(
  sourceData: ImageData | null,
  steps: T
): PipelineResult | null {
  const [result, setResult] = useState<PipelineResult | null>(null);

  useEffect(() => {
    if (!sourceData) return;
    let cancelled = false;

    pipelineGateway
      .run({ sourceImageData: sourceData, steps: [...steps] })
      .then((r) => {
        if (!cancelled) setResult(r);
      })
      .catch(console.error);

    return () => {
      cancelled = true;
    };
  }, [sourceData, steps]);

  return result;
}
