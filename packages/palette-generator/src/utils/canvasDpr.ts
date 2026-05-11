export function getDPR(): number {
  return Math.max(1, typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1);
}

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
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return ctx;
}

export function clientToInternalPixel(
  evClientX: number,
  evClientY: number,
  canvas: HTMLCanvasElement
): { xInternal: number; yInternal: number; dpr: number } | null {
  const rect = canvas.getBoundingClientRect();
  const dpr = getDPR();
  const xCss = evClientX - rect.left;
  const yCss = evClientY - rect.top;
  if (xCss < 0 || yCss < 0 || xCss > rect.width || yCss > rect.height) return null;
  const xInternal = Math.floor(xCss * (canvas.width / rect.width));
  const yInternal = Math.floor(yCss * (canvas.height / rect.height));
  return { xInternal, yInternal, dpr };
}
