import type { StageContext } from '../../core/StageContext';

type PlotLayer = {
  formula: (x: number) => number;
  color: string;
};

type drawExpressionsProps = {
  ctx: CanvasRenderingContext2D;
  stage: StageContext;
  layers: PlotLayer[];
};

function drawExpressions({ ctx, stage, layers }: drawExpressionsProps) {
  const width = stage.width;
  const view = stage.view;
  const xSpan = view.xMax - view.xMin;

  // 1. Initialize paths and tracking for each layer
  ctx.save();
  ctx.lineWidth = 2;

  const totalLayers = layers.length;
  const isFirstPoint = new Array(totalLayers).fill(true);

  // Set up strokes per color to avoid context switching state overhead
  // We'll use individual beginPaths for simplicity, but a single loop
  const paths = layers.map(() => new Path2D());

  const prevMathY = new Array<number | null>(totalLayers).fill(null);

  // 2. RUN THE SINGLE LOOP ACROSS SCREEN PIXELS
  for (let screenX = 0; screenX < width; screenX++) {
    // Calculate mathX once for this column
    const mathX = view.xMin + (screenX / width) * xSpan;

    // Evaluate all layers at this exact X coordinate
    for (let i = 0; i < totalLayers; i++) {
      const layer = layers[i];
      if (!layer) return;
      const mathY = layer.formula(mathX);

      // Safe domain check
      if (isNaN(mathY) || !isFinite(mathY)) {
        isFirstPoint[i] = true;
        prevMathY[i] = null;
        continue;
      }

      // Asymptote Jump Detection
      if (prevMathY[i] !== null) {
        const lastY = prevMathY[i];
        if (!lastY) return;
        if (isNaN(lastY) || !isFinite(lastY)) {
          isFirstPoint[i] = true;
          prevMathY[i] = null;
          continue;
        }

        // If the signs flipped (one positive, one negative)
        const signChanged = Math.sign(mathY) !== Math.sign(lastY);
        // And the sheer gap between them is huge (e.g., larger than your total visible Y view span)
        const hugeGap = Math.abs(mathY - lastY) > view.yMax - view.yMin;

        if (signChanged && hugeGap) {
          isFirstPoint[i] = true; // Tell the engine to lift the pen and start a new path branch
        }
      }

      // Project and draw
      const { sy: screenY } = stage.toScreen2D(mathX, mathY);
      const path = paths[i];
      if (!path) return;

      if (isFirstPoint[i]) {
        path.moveTo(screenX, screenY);
        isFirstPoint[i] = false;
      } else {
        path.lineTo(screenX, screenY);
      }

      // Update memory for the next pixel column
      prevMathY[i] = mathY;
    }
  }

  // Commit the paths to canvas in one swift batch stroke
  for (let i = 0; i < totalLayers; i++) {
    ctx.strokeStyle = layers[i].color;
    ctx.stroke(paths[i]);
  }

  ctx.restore();
}
