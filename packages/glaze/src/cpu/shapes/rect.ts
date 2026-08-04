import { beginShape, paintShape } from './paint';
import type { DrawStyle, Rect } from './types';

export function drawRect(context: CanvasRenderingContext2D, style: DrawStyle, rect: Rect): void {
  beginShape(context, style);
  context.rect(rect.x, rect.y, rect.w, rect.h);
  paintShape(context, style);
}
