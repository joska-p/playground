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
    backgroundColor:
      "hsla(var(--hue) var(--saturation) 50% / var(--bg-opacity))",
  };
  const luminosityStyles = {
    "--bg-opacity": "1",
    backgroundColor:
      "hsla(var(--hue) var(--saturation) var(--luminosity) / var(--bg-opacity))",
  };

  const handleHueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    colorWheelRef.current?.style.setProperty("--hue", `${event.target.value}`);
  };

  const handleSaturationChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    colorWheelRef.current?.style.setProperty(
      "--saturation",
      `${event.target.value}%`,
    );
  };

  const handleLuminosityChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    colorWheelRef.current?.style.setProperty(
      "--luminosity",
      `${event.target.value}%`,
    );
  };

  return (
    <section
      className="grid grid-cols-3 gap-20"
      style={colorWheelStyles}
      ref={colorWheelRef}
    >
      <div className="flex flex-col gap-10">
        <label htmlFor="hue-slider">Hue</label>
        <div className="h-40 w-full" style={hueStyles} />
        <input
          type="range"
          id="hue-slider"
          name="hue-slider"
          min={0}
          max={360}
          step={1}
          defaultValue={180}
          onChange={handleHueChange}
        />
      </div>

      <div className="flex flex-col gap-10">
        <label htmlFor="saturation-slider">Saturation</label>
        <div className="h-40 w-full" style={saturationStyles} />
        <input
          type="range"
          id="saturation-slider"
          name="saturation-slider"
          min={0}
          max={100}
          step={1}
          defaultValue={50}
          onChange={handleSaturationChange}
        />
      </div>

      <div className="flex flex-col gap-10">
        <label htmlFor="value-slider">Luminosity</label>
        <div className="h-40 w-full" style={luminosityStyles} />
        <input
          type="range"
          id="value-slider"
          name="value-slider"
          min={0}
          max={100}
          step={1}
          defaultValue={50}
          onChange={handleLuminosityChange}
        />
      </div>
    </section>
  );
};

export { ColorWheel };
