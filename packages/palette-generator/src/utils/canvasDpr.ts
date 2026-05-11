export function getDPR(): number {
  return Math.max(1, typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1);
}

/**
 * Sizes the canvas backing store to `displayPx * dpr` and sets a CSS transform
 * so drawing commands use CSS pixel units.
 *
 * NOTE: ctx.putImageData() ignores the canvas transform — always pass physical
 * pixel coordinates (canvas.width / canvas.height) to createImageData() when
 * using putImageData directly.
 */
export function configureCanvasForDPR(
  canvas: HTMLCanvasElement,
  displayPx: number,
  dpr = getDPR()
): CanvasRenderingContext2D | null {
  const internal = Math.max(1, Math.round(displayPx * dpr));
  canvas.width = internal;
  canvas.height = internal;
  canvas.style.width = `${displayPx}px`;
  canvas.style.height = `${displayPx}px`;

  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // Scale so all subsequent draw calls use CSS pixel units.
  // putImageData bypasses this transform — use canvas.width/height for image size.
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return ctx;
}

export function clientToInternalPixel(
  evClientX: number,
  evClientY: number,
  canvas: HTMLCanvasElement
): { xInternal: number; yInternal: number } | null {
  const rect = canvas.getBoundingClientRect();
  const xCss = evClientX - rect.left;
  const yCss = evClientY - rect.top;
  if (xCss < 0 || yCss < 0 || xCss > rect.width || yCss > rect.height) return null;
  // Map CSS coords → physical backing-store pixels
  const xInternal = Math.floor(xCss * (canvas.width / rect.width));
  const yInternal = Math.floor(yCss * (canvas.height / rect.height));
  return { xInternal, yInternal };
}
