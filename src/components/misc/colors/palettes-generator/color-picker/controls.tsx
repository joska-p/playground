import type { Signal } from "@preact/signals-react";
import type { HSLColor } from "../lib/color-conversions";

type Props = {
  baseColor: Signal<HSLColor>;
  marker: Signal<{ x: number; y: number }>;
};

function Controls({ baseColor }: Props) {
  return (
    <>
      <label className="w-full">
        <div
          className="h-8 w-full"
          style={{
            backgroundImage: `linear-gradient(to right, hsl(0, ${baseColor.value.saturation}%, ${baseColor.value.lightness}%), hsl(120, ${baseColor.value.saturation}%, ${baseColor.value.lightness}%), hsl(240, ${baseColor.value.saturation}%, ${baseColor.value.lightness}%), hsl(360, ${baseColor.value.saturation}%, ${baseColor.value.lightness}%))`,
          }}
        />
        <input
          className="w-full"
          type="range"
          min={0}
          max={360}
          step={1}
          value={baseColor.value.hue}
          aria-label="Hue"
          onChange={(event) =>
            (baseColor.value = { ...baseColor.value, hue: Number(event.target.value) })
          }
        />
      </label>
      <label className="w-full">
        <div
          className="h-8 w-full"
          style={{
            backgroundImage: `linear-gradient(to right, hsl(${baseColor.value.hue}, 0%, ${baseColor.value.lightness}%), hsl(${baseColor.value.hue}, 100%, ${baseColor.value.lightness}%))`,
          }}
        />
        <input
          className="w-full"
          type="range"
          min={0}
          max={100}
          step={1}
          value={baseColor.value.saturation}
          aria-label="Saturation"
          onChange={(event) =>
            (baseColor.value = { ...baseColor.value, saturation: Number(event.target.value) })
          }
        />
      </label>
      <label className="w-full">
        <div
          className="h-8 w-full"
          style={{
            backgroundImage: `linear-gradient(to right, hsl(${baseColor.value.hue}, ${baseColor.value.saturation}%, 0%),hsl(${baseColor.value.hue}, ${baseColor.value.saturation}%, 50%), hsl(${baseColor.value.hue}, ${baseColor.value.saturation}%, 100%))`,
          }}
        />
        <input
          className="w-full"
          type="range"
          min={0}
          max={100}
          step={1}
          value={baseColor.value.lightness}
          aria-label="Lightness"
          onChange={(event) =>
            (baseColor.value = { ...baseColor.value, lightness: Number(event.target.value) })
          }
        />
      </label>
    </>
  );
}

export { Controls };
