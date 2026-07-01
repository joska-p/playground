import type { Step } from '@repo/pixel-engine/manipulations/manifest';
import { useEffect, useState } from 'react';
import { pixel } from '../api/pixel';

export function usePixel(sourceImageData: ImageData | null, steps: readonly Step[]) {
  const [result, setResult] = useState<ImageData[]>([]);

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
