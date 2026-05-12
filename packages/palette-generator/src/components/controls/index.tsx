import { ColorSlice } from "./color-picker/ColorSlice";

function Controls() {
  return (
    <div className="flex flex-wrap gap-6 p-4">
      <ColorSlice spaceId="oklab" size={200} />
      <ColorSlice spaceId="oklch" size={200} />
      <ColorSlice spaceId="hsl" size={200} />
      <ColorSlice spaceId="hsv" size={200} />
    </div>
  );
}

export { Controls };
