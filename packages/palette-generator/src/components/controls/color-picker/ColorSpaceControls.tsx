import { useState } from "react";
import { COLOR_SPACES } from "../../../core/colorspaces";
import { ColorSpaceCanvas } from "./ColorSpaceCanvas";
import { Slider } from "@repo/ui";

type ColorSliceProps = {
  spaceId?: keyof typeof COLOR_SPACES;
  size?: number;
};

function ColorSpaceControls({ spaceId = "oklab", size = 200 }: ColorSliceProps) {
  const { name, zSlider } = COLOR_SPACES[spaceId];
  const [zValue, setZValue] = useState<number>(zSlider.max / 2);

  return (
    <div className="flex flex-col gap-8">
      <h3>{name} Slice</h3>
      <ColorSpaceCanvas spaceId={spaceId} zValue={zValue} size={size} />

      <Slider
        label={zSlider.label}
        min={zSlider.min}
        max={zSlider.max}
        step={zSlider.step ?? 1}
        value={zValue}
        onChange={setZValue}
      />
    </div>
  );
}

export { ColorSpaceControls };
