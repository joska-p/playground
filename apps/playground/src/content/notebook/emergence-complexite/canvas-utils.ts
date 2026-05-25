export function resizeCanvas(
  canvas: HTMLCanvasElement,
  height?: number,
): CanvasRenderingContext2D {
  const ctx = canvas.getContext("2d")!;
  const h = height ?? canvas.offsetHeight;
  canvas.width = canvas.offsetWidth * devicePixelRatio;
  canvas.height = h * devicePixelRatio;
  ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
  return ctx;
}

export function observeOnce(
  el: Element,
  callback: () => void,
  threshold = 0.3,
): void {
  new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        callback();
      }
    },
    { threshold },
  ).observe(el);
}
