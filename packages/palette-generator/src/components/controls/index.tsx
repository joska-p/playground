import { usePaletteStore, setBaseColor } from "../../store/usePaletteStore";

function Controls() {
  const baseColor = usePaletteStore((state) => state.baseColor);

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBaseColor(e.target.value);
  };

  return (
    <div>
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
