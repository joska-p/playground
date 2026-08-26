import { Button } from '@repo/tlc/components/forms';
import { useEffect, useRef } from 'react';

import { CloseIcon } from '../shared/CloseIcon';

import type { OutputType } from '../../stores/manipulator/types';

type UploadedPreviewProps = {
    imageSource: OutputType;
    fileName?: string;
    onClear: () => void;
};

function UploadedPreview({ imageSource, fileName, onClear }: UploadedPreviewProps) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;

        if (!canvas) return;

        const ctx = canvas.getContext('2d');

        if (ctx) {
            canvas.width = canvas.clientWidth;
            canvas.height = canvas.clientHeight;
            ctx.putImageData(imageSource.imageData, 0, 0);
        }
    }, [imageSource]);

    return (
        <figure className="border-border bg-card flex items-center gap-3 rounded-lg border p-3">
            <div className="bg-primary/10 flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-md">
                <canvas
                    ref={canvasRef}
                    className="h-full w-full object-cover"
                />
            </div>
            <figcaption className="min-w-0 flex-1">
                <p className="text-foreground truncate text-sm font-medium">
                    {fileName ?? 'image'}
                </p>
                <p className="text-muted-foreground text-xs">
                    {imageSource.imageData.width} × {imageSource.imageData.height}
                </p>
            </figcaption>
            <Button
                variant="default"
                size="sm"
                onClick={onClear}
                aria-label="Remove image"
                className="shrink-0"
            >
                <CloseIcon />
            </Button>
        </figure>
    );
}

export { UploadedPreview };
