import React, { useEffect, useState } from "react";
import { useOKLchCanvas } from "../../hooks/useOKLchCanvas";
import { Slider, cn } from "@repo/ui";

type Props = {
  initialL?: number;
  displaySize?: number;
  chroma?: number;
  hueDegrees?: number;
  className?: string;
  onPick?: (payload: { oklab: string; hex: string; rgb: [number, number, number] }) => void;
};

export default function OKLabSlice({
  initialL = 0.8,
  displaySize = 512,
  chroma = 0.6,
  hueDegrees = 0.6,
  className,
  onPick,
}: Props) {
  const [lightness, setLightness] = useState<number>(initialL);
  const [picked, setPicked] = useState<string>("");

  const { canvasRef, renderOKLchSlice, getColorAtClientPosition } = useOKLchCanvas({
    lightness,
    displaySize,
    chroma,
    hueDegrees,
  });

  useEffect(() => {
    renderOKLchSlice();
  }, [lightness, displaySize, renderOKLchSlice]);

  const onCanvasClick = (ev: React.MouseEvent<HTMLCanvasElement>) => {
    const css = getColorAtClientPosition(ev.nativeEvent);
    if (!css) return;
    setPicked(`${css.oklab} → ${css.hex}`);
    navigator.clipboard.writeText(`${css.oklab} /* ${css.hex} */`).catch(() => {});
    if (onPick) onPick(css);
  };

  const handleLightnessChange = (value: number) => {
    setLightness(value);
  };

  return (
    <div className={cn("flex flex-col items-start gap-4 p-3 font-sans", className)}>
      <canvas
        ref={canvasRef}
        className="block cursor-crosshair border border-gray-200"
        title="OKLab a (x) vs b (y)"
        onClick={onCanvasClick}
        style={{ width: displaySize, height: displaySize, imageRendering: "pixelated" }}
      />

      <Slider
        label="Lightness"
        min={0}
        max={1}
        step={0.01}
        value={lightness}
        onChange={handleLightnessChange}
      />

      <div className="mt-2 text-sm break-words">{picked}</div>
    </div>
  );
}
