import { Label } from "@ui/label";
import { Slider } from "@ui/slider";
import { useRef } from "react";

const ColorWheel = () => {
  const colorWheelRef = useRef<HTMLDivElement>(null);

  const colorWheelStyles = {
    "--tw-bg-opacity": "1",
    "--tw-hue": "0",
    "--tw-saturation": "100%",
    "--tw-value": "50%",
  } as React.CSSProperties;

  const hueStyles = {
    "--tw-bg-opacity": "1",
    backgroundColor: "hsla(var(--tw-hue) 100% 50% / var(--tw-bg-opacity))",
  };
  const saturationStyles = {
    "--tw-bg-opacity": "1",
    backgroundColor: "hsla(var(--tw-hue) var(--tw-saturation) 50% / var(--tw-bg-opacity))",
  };
  const valueStyles = {
    "--tw-bg-opacity": "1",
    backgroundColor:
      "hsla(var(--tw-hue) var(--tw-saturation) var(--tw-value) / var(--tw-bg-opacity))",
  };

  const handleHueChange = (value: number) => {
    colorWheelRef.current?.style.setProperty("--tw-hue", `${value}`);
  };

  const handleSaturationChange = (value: number) => {
    colorWheelRef.current?.style.setProperty("--tw-saturation", `${value}%`);
  };

  const handleValueChange = (value: number) => {
    colorWheelRef.current?.style.setProperty("--tw-value", `${value}%`);
  };

  return (
    <section className="grid grid-cols-3 gap-20" style={colorWheelStyles} ref={colorWheelRef}>
      <div className="flex flex-col gap-10">
        <Label htmlFor="hue-slider">Hue</Label>
        <div className="h-40 w-full" style={hueStyles}></div>
        <Slider
          id="hue-slider"
          name="hue-slider"
          min={0}
          max={360}
          step={1}
          defaultValue={[0]}
          onValueChange={(value) => handleHueChange(value[0])}
        />
      </div>

      <div className="flex flex-col gap-10">
        <Label htmlFor="saturation-slider">Saturation</Label>
        <div className="h-40 w-full" style={saturationStyles}></div>
        <Slider
          id="saturation-slider"
          name="saturation-slider"
          min={0}
          max={100}
          step={1}
          defaultValue={[0]}
          onValueChange={(value) => handleSaturationChange(value[0])}
        />
      </div>

      <div className="flex flex-col gap-10">
        <Label htmlFor="value-slider">Value</Label>
        <div className="h-40 w-full" style={valueStyles}></div>
        <Slider
          id="value-slider"
          name="value-slider"
          min={0}
          max={100}
          step={1}
          defaultValue={[0]}
          onValueChange={(value) => handleValueChange(value[0])}
        />
      </div>
    </section>
  );
};

export default ColorWheel;
