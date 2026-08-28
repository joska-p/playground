import { BackgroundCanvas } from '../components/BackgroundCanvasReact';
import { EdgeFieldCanvas } from '../components/EdgeFieldCanvasReact';
import type { ReactNode } from 'react';

interface CanvasRendererProps {
    canvasComponent: string;
    className?: string;
}

const CANVAS_REGISTRY: Record<string, React.ComponentType<{ className?: string }>> = {
    BackgroundCanvas: BackgroundCanvas,
    EdgeFieldCanvas: EdgeFieldCanvas
};

export function CanvasRenderer({ canvasComponent, className }: CanvasRendererProps): ReactNode {
    const Component = CANVAS_REGISTRY[canvasComponent];

    if (!Component) {
        return (
            <div className="h-full w-full flex items-center justify-center bg-muted/30 text-muted-foreground text-center p-8">
                <div className="max-w-md">
                    <h2 className="text-2xl font-mono font-semibold mb-4">Canvas Not Found</h2>
                    <p className="text-sm font-mono text-muted-foreground/60">
                        Canvas component not found: {canvasComponent}
                    </p>
                </div>
            </div>
        );
    }

    return <Component className={className ?? ''} />;
}
