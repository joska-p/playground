import { useEffect, useState } from "react";
import { pipelineGateway } from "../api/pipeline-gateway";
import type { Step } from "../core/manipulations/manifest";

export function usePipeline<const T extends readonly Step[]>(
  sourceImageData: ImageData | null,
  steps: T
): ImageData[] | null {
  const [result, setResult] = useState<ImageData[] | null>(null);

  useEffect(() => {
    if (!sourceImageData) return;
    let cancelled = false;

    pipelineGateway
      .run({ sourceImageData, steps: [...steps] })
      .then((pipelineResult) => {
        if (!cancelled) setResult(pipelineResult);
      })
      .catch(console.error);

    return () => {
      cancelled = true;
    };
  }, [sourceImageData, steps]);

  return result;
}
