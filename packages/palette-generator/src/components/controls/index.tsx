import { usePaletteStore, setBaseColor } from "../../store/usePaletteStore";
import OKLabSlice from "./OKLabSlice";

function Controls() {
  const baseColor = usePaletteStore((state) => state.baseColor);

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBaseColor(e.target.value);
  };

  const handleColorPick = (c: { oklab: string; hex: string; rgb: [number, number, number] }) => {
    setBaseColor(c.hex);
  };

  return (
    <div>
      <OKLabSlice initialL={0.75} displaySize={400} onPick={handleColorPick} />
      <input
        type="color"
        onChange={handleColorChange}
        value={baseColor}
        id="exemple"
        name="example"
      />
    </div>
  );
}

export { Controls };
