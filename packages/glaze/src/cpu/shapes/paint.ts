import type { DrawStyle, PathOptions } from './types';

export const DEFAULT_STROKE_WIDTH = 1;
export const DEFAULT_FONT_FAMILY = 'sans-serif';

export function beginShape(context: CanvasRenderingContext2D, style: DrawStyle): void {
  context.beginPath();
  if (style.fill) context.fillStyle = style.fill;
  if (style.stroke) {
    context.strokeStyle = style.stroke;
    context.lineWidth = style.lineWidth ?? DEFAULT_STROKE_WIDTH;
    context.lineJoin = 'round';
    context.lineCap = 'round';
  }
}

export function paintShape(context: CanvasRenderingContext2D, style: DrawStyle, options?: PathOptions): void {
  const fill = options?.fill ?? (style.fill !== undefined);
  const stroke = options?.stroke ?? (style.stroke !== undefined);
  if (fill && style.fill) context.fill();
  if (stroke && style.stroke) context.stroke();
}
