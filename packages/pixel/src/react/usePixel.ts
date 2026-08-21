import { useEffect, useState } from 'react';

import { processImageInWorker } from '../worker/process-image-in-worker';

import type { Step } from '../processor/manipulations/manifest';

export function usePixel(sourceImageData: ImageData | null, steps: readonly Step[]) {
    const [result, setResult] = useState<ImageData[]>([]);

    useEffect(() => {
        if (!sourceImageData) return;

        let cancelled = false;

        processImageInWorker({ sourceImageData, steps })
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
