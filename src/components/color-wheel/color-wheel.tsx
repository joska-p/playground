import { Label } from "@ui/label";
import { Slider } from "@ui/slider";
import { useRef } from "react";

const ColorWheel = () => {
  const colorWheelRef = useRef<HTMLDivElement>(null);

  const colorWheelStyles = {
    "--bg-opacity": "1",
    "--hue": "180",
    "--saturation": "50%",
    "--luminosity": "50%",
  } as React.CSSProperties;

  const hueStyles = {
    "--bg-opacity": "1",
    backgroundColor: "hsla(var(--hue) 100% 50% / var(--bg-opacity))",
  };
  const saturationStyles = {
    "--bg-opacity": "1",
    backgroundColor: "hsla(var(--hue) var(--saturation) 50% / var(--bg-opacity))",
  };
  const luminosityStyles = {
    "--bg-opacity": "1",
    backgroundColor: "hsla(var(--hue) var(--saturation) var(--luminosity) / var(--bg-opacity))",
  };

  const handleHueChange = (value: number) => {
    colorWheelRef.current?.style.setProperty("--hue", `${value}`);
  };

  const handleSaturationChange = (value: number) => {
    colorWheelRef.current?.style.setProperty("--saturation", `${value}%`);
  };

  const handleLuminosityChange = (value: number) => {
    colorWheelRef.current?.style.setProperty("--luminosity", `${value}%`);
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
          defaultValue={[180]}
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
          defaultValue={[50]}
          onValueChange={(value) => handleSaturationChange(value[0])}
        />
      </div>

      <div className="flex flex-col gap-10">
        <Label htmlFor="value-slider">Luminosity</Label>
        <div className="h-40 w-full" style={luminosityStyles}></div>
        <Slider
          id="value-slider"
          name="value-slider"
          min={0}
          max={100}
          step={1}
          defaultValue={[50]}
          onValueChange={(value) => handleLuminosityChange(value[0])}
        />
      </div>
    </section>
  );
};

export default ColorWheel;
