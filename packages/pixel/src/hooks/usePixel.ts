import type { Step } from '@repo/pixel-engine/manipulations/manifest';
import { useEffect, useState } from 'react';
import { pixel } from '../api/pixel';

/**
 * Runs `steps` against `sourceImageData` whenever either changes, resolving
 * with one `ImageData` snapshot per step. Returns `[]` until the first result.
 */
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
