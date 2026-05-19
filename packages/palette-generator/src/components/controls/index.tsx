import { ColorSpaceControls } from "./color-picker/ColorSpaceControls";

function Controls() {
  return (
    <div className="flex flex-wrap gap-6 p-4">
      <ColorSpaceControls spaceId="lab" size={200} />
      <ColorSpaceControls spaceId="lch" size={200} />
      <ColorSpaceControls spaceId="hsl" size={200} />
      <ColorSpaceControls spaceId="srgb" size={200} />
    </div>
  );
}

export { Controls };
