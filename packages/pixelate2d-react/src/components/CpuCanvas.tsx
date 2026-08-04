import { CanvasBase, type CanvasProps } from './CanvasBase';

/** Canvas2D-backed canvas container with built-in pan/zoom camera. */
export function CpuCanvas(props: CanvasProps) {
  return <CanvasBase type="cpu" {...props} />;
}
