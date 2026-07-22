type Bounds = {
  left: number;
  right: number;
  top: number;
  bottom: number;
};

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function invLerp(a: number, b: number, v: number) {
  return (v - a) / (b - a);
}

function remap(oldA: number, oldB: number, newA: number, newB: number, v: number) {
  return lerp(newA, newB, invLerp(oldA, oldB, v));
}

function getPixelBounds(canvas: HTMLCanvasElement, margin = 0): Bounds {
  return {
    left: margin,
    right: canvas.width - margin,
    top: margin,
    bottom: canvas.height - margin
  };
}

function getDataBounds(data: [number, number][]): Bounds {
  const x = data.map((point) => point[0]);
  const y = data.map((point) => point[1]);
  const minX = Math.min(...x);
  const maxX = Math.max(...x);
  const minY = Math.min(...y);
  const maxY = Math.max(...y);
  return {
    left: minX,
    right: maxX,
    top: maxY,
    bottom: minY
  };
}

function remapPoint(
  oldBounds: Bounds,
  newBounds: Bounds,
  point: [number, number]
): [number, number] {
  return [
    remap(oldBounds.left, oldBounds.right, newBounds.left, newBounds.right, point[0]),
    remap(oldBounds.top, oldBounds.bottom, newBounds.top, newBounds.bottom, point[1])
  ];
}

function getPixelPoint({
  pixelBounds,
  dataBounds,
  point
}: {
  pixelBounds: ReturnType<typeof getPixelBounds>;
  dataBounds: ReturnType<typeof getDataBounds>;
  point: [number, number];
}): [number, number] {
  return remapPoint(dataBounds, pixelBounds, point);
}

function drawPoint(
  point: [number, number],
  ctx: CanvasRenderingContext2D,
  size = 8,
  color = 'white'
) {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.arc(point[0], point[1], size / 2, 0, Math.PI * 2);
  ctx.fill();
}

export { drawPoint, getDataBounds, getPixelBounds, getPixelPoint, invLerp, lerp, remap };
