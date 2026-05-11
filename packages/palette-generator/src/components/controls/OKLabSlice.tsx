import React, { useEffect, useState } from "react";
import { useOKLabCanvas } from "../../hooks/useOKLabCanvas";

type Props = {
  initialL?: number;
  displaySize?: number;
  aRange?: number;
  bRange?: number;
  className?: string;
  onPick?: (payload: { oklab: string; hex: string; rgb: [number, number, number] }) => void;
};

export default function OKLabSlice({
  initialL = 0.8,
  displaySize = 512,
  aRange = 0.6,
  bRange = 0.6,
  className,
  onPick,
}: Props) {
  const [L, setL] = useState<number>(initialL);
  const [picked, setPicked] = useState<string>("");

  const { canvasRef, renderOKLabSlice, getColorAtClientPosition } = useOKLabCanvas({
    L,
    displaySize,
    aRange,
    bRange,
  });

  useEffect(() => {
    renderOKLabSlice();
  }, [L, displaySize, renderOKLabSlice]);

  const onCanvasClick = (ev: React.MouseEvent<HTMLCanvasElement>) => {
    const css = getColorAtClientPosition(ev.nativeEvent);
    if (!css) return;
    setPicked(`${css.oklab} → ${css.hex}`);
    navigator.clipboard.writeText(`${css.oklab} /* ${css.hex} */`).catch(() => {});
    if (onPick) onPick(css);
  };

  return (
    <div className={`flex items-start gap-4 p-3 font-sans ${className ?? ""}`}>
      <div className="w-56">
        <label className="mb-2 block text-sm">
          <div className="flex justify-between">
            <span>Lightness L</span>
            <span className="font-semibold text-gray-500">{L.toFixed(2)}</span>
          </div>
          <input
            className="mt-2 w-full"
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={L}
            onChange={(e) => setL(parseFloat(e.target.value))}
          />
        </label>

        <div className="mt-2 text-sm text-gray-600">
          Click the image to copy the CSS oklab() color.
        </div>
        <div className="mt-2 text-sm break-words">{picked}</div>
      </div>

      <canvas
        ref={canvasRef}
        className="block cursor-crosshair border border-gray-200"
        title="OKLab a (x) vs b (y)"
        onClick={onCanvasClick}
        style={{ width: displaySize, height: displaySize, imageRendering: "pixelated" }}
      />
    </div>
  );
}
