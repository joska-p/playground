import { usePaletteStore } from "../../store/usePaletteStore";

function Display() {
  const baseColor = usePaletteStore((state) => state.baseColor);
  return (
    <div>
      <div style={{ backgroundColor: baseColor }}>
        <p>{baseColor}</p>
      </div>
    </div>
  );
}

export { Display };
