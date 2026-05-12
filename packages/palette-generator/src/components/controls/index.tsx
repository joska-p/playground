import { ColorSpaceControls } from "./color-picker/ColorSpaceControls";

function Controls() {
  return (
    <div className="flex flex-wrap gap-6 p-4">
      <ColorSpaceControls spaceId="oklab" size={200} />
      <ColorSpaceControls spaceId="oklch" size={200} />
      <ColorSpaceControls spaceId="hsl" size={200} />
      <ColorSpaceControls spaceId="hsv" size={200} />
    </div>
  );
}

export { Controls };
