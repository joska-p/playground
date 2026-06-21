import type { Step } from '@repo/pixel-engine/manipulations/manifest';
import { useEffect, useState } from 'react';
import { pixel } from '../api/pixel';

export function usePixel<const T extends readonly Step[]>(
  sourceImageData: ImageData | null,
  steps: T
): ImageData[] | null {
  const [result, setResult] = useState<ImageData[] | null>(null);

  useEffect(() => {
    if (!sourceImageData) return;
    let cancelled = false;

    pixel
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
