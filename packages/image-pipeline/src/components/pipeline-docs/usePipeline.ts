import { useEffect, useState } from "react";
import { pipelineGateway } from "../../api/pipeline-gateway";
import type { PipelineResult, Step } from "../../core/image-pipeline.types";

export function usePipeline(
  sourceData: ImageData | null,
  steps: readonly Step[]
): PipelineResult | null {
  const [result, setResult] = useState<PipelineResult | null>(null);

  useEffect(() => {
    if (!sourceData) return;
    let cancelled = false;

    pipelineGateway(sourceData, [...steps])
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
