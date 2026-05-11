import { useEffect, useState } from "react";
import { Slider, cn } from "@repo/ui";
import { useCanvasSlice } from "../../hooks/useCanvasSlice";
import type { ColorSpaceDef } from "../../utils/colorspaces";
import type { PickResult } from "../../utils/color-utils";

type SliceProps = {
  colorSpace: ColorSpaceDef;
  displaySize?: number;
  onPick?: (result: PickResult) => void;
  className?: string;
};

function Slice({ colorSpace, displaySize = 512, onPick, className }: SliceProps) {
  // Uncontrolled fallback: manage params internally if none are passed in
  const [params, setParams] = useState(colorSpace.defaultParams);
  const { canvasRef, render, getColorAtClientPosition } = useCanvasSlice(
    colorSpace,
    params,
    displaySize
  );

  useEffect(() => {
    render();
  }, [render]);

  const onCanvasClick = (ev: React.MouseEvent<HTMLCanvasElement>) => {
    const result = getColorAtClientPosition(ev.nativeEvent);
    if (!result) return;
    onPick?.(result);
  };

  return (
    <div className={cn("flex flex-col items-start gap-4 p-3 font-sans", className)}>
      <canvas
        ref={canvasRef}
        className="block cursor-crosshair border border-gray-200"
        title={`${colorSpace.name}: ${colorSpace.xLabel} (x) vs ${colorSpace.yLabel} (y)`}
        onClick={onCanvasClick}
        style={{ width: displaySize, height: displaySize, imageRendering: "pixelated" }}
      />

      {colorSpace.sliders.map((slider) => (
        <Slider
          key={slider.key}
          label={slider.label}
          min={slider.min}
          max={slider.max}
          step={slider.step}
          value={params[slider.key]!}
          onChange={(value: number) => setParams((prev) => ({ ...prev, [slider.key]: value }))}
        />
      ))}
    </div>
  );
}

export default Slice;
