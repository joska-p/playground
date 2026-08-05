import { CanvasBase, type CanvasProps } from './CanvasBase';

/** WebGL2-backed canvas container with built-in pan/zoom camera. */
export function GpuCanvas(props: CanvasProps) {
        return (
                <CanvasBase
                        type="gpu"
                        {...props}
                />
        );
}
