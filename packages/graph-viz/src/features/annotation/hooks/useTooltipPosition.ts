const TOOLTIP_MARGIN = 10;
const TOOLTIP_WIDTH = 220;
const ESTIMATED_HEIGHT = 120;

export type TooltipScreenPosition = {
  left: number;
  top: number;
};

/**
 * Compute tooltip screen position from pointer coordinates,
 * clamping to viewport edges to avoid overflow.
 * Returns null when no position can be determined (no pointer data).
 *
 * The React Compiler handles memoization; this runs plain computation in render.
 */
export function useTooltipPosition(
  pointerX: number | null,
  pointerY: number | null
): TooltipScreenPosition | null {
  if (pointerX === null || pointerY === null) return null;

  const vw = window.innerWidth;
  const vh = window.innerHeight;

  let left = pointerX + TOOLTIP_MARGIN;
  let top = pointerY + TOOLTIP_MARGIN;

  // Try to place below cursor, flip above if not enough room
  if (top + ESTIMATED_HEIGHT > vh - TOOLTIP_MARGIN) {
    top = pointerY - ESTIMATED_HEIGHT - TOOLTIP_MARGIN;
  }

  // Clamp horizontal
  if (left + TOOLTIP_WIDTH > vw - TOOLTIP_MARGIN) {
    left = pointerX - TOOLTIP_WIDTH - TOOLTIP_MARGIN;
  }

  // Clamp to viewport edges
  left = Math.max(
    TOOLTIP_MARGIN,
    Math.min(left, vw - TOOLTIP_WIDTH - TOOLTIP_MARGIN)
  );
  top = Math.max(TOOLTIP_MARGIN, top);

  return { left, top };
}
