import { useEffect, useState } from 'react';
import { imagePipeline } from '../api/image-pipeline';
import type { Step } from '../core/manipulations/manifest';

export function usePipeline<const T extends readonly Step[]>(
  sourceImageData: ImageData | null,
  steps: T
): ImageData[] | null {
  const [result, setResult] = useState<ImageData[] | null>(null);

  useEffect(() => {
    if (!sourceImageData) return;
    let cancelled = false;

    imagePipeline
      .run({ sourceImageData, steps })
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
