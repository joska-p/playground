import { useEffect, useRef, useState, useMemo } from "react";
import { COLOR_SPACES } from "../../../core/colorspaces";

type ColorSliceProps = {
  spaceId?: keyof typeof COLOR_SPACES;
  size?: number;
};

function ColorSlice({ spaceId = "oklab", size = 300 }: ColorSliceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 1. Get the definition for the selected color space
  const config = useMemo(() => COLOR_SPACES[spaceId], [spaceId]);

  // 2. Local state for the "Slice" depth (Z-axis)
  const [zValue, setZValue] = useState<number>(config.zSlider.min);

  // Reset slider when the color space changes
  // useEffect(() => {
  //   setZValue(config.zSlider.min);
  // }, [config]);

  // 3. Draw the 2D slice onto the canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const imageData = ctx.createImageData(size, size);
    const data = imageData.data;

    const { xAxis, yAxis, toRGB } = config;

    for (let py = 0; py < size; py++) {
      for (let px = 0; px < size; px++) {
        // Map pixel coordinates to axis ranges
        // xAxis is horizontal (left to right)
        // yAxis is vertical (top to bottom)
        const x = xAxis.min + (px / size) * (xAxis.max - xAxis.min);
        const y = yAxis.max - (py / size) * (yAxis.max - yAxis.min); // Invert y for standard Cartesian

        // Calculate RGB
        const [r, g, b] = toRGB(x, y, zValue);

        const index = (py * size + px) * 4;
        data[index] = r; // Red
        data[index + 1] = g; // Green
        data[index + 2] = b; // Blue
        data[index + 3] = 255; // Alpha
      }
    }

    ctx.putImageData(imageData, 0, 0);
  }, [config, zValue, size]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", width: size }}>
      <h3>{config.name} Slice</h3>

      <div style={{ position: "relative", border: "1px solid #ccc" }}>
        <canvas ref={canvasRef} width={size} height={size} style={{ display: "block" }} />
        {/* Axis Labels */}
        <div
          style={{
            position: "absolute",
            bottom: -20,
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "12px",
          }}
        >
          {config.xAxis.label}
        </div>
        <div
          style={{
            position: "absolute",
            left: -60,
            top: "50%",
            transform: "rotate(-90deg) translateY(-50%)",
            fontSize: "12px",
            width: size,
          }}
        >
          {config.yAxis.label}
        </div>
      </div>

      <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column" }}>
        <label htmlFor="z-slider">
          {config.zSlider.label}: {zValue.toFixed(2)}
        </label>
        <input
          id="z-slider"
          type="range"
          min={config.zSlider.min}
          max={config.zSlider.max}
          step={config.zSlider.step ?? 1}
          value={zValue}
          onChange={(e) => setZValue(parseFloat(e.target.value))}
          style={{ width: "100%" }}
        />
      </div>
    </div>
  );
}

export { ColorSlice };
