import { Input, Slider, Label } from "@jpotin/playground-ui";
import { useRacamanContext } from "./racaman-context";

function Controls() {
  const { sequence, drawMode, updateSequence, changeDrawMode } = useRacamanContext();

  return (
    <form className="bg-background/90 flex items-center justify-center gap-8 py-4">
      <Slider
        label="sequence length"
        value={sequence.length}
        onChange={updateSequence}
        step={1}
        min={1}
        max={256}
      />

      <Label>
        <Input
          type="radio"
          value="canvas-mode"
          checked={drawMode === "canvas-mode"}
          name="canvas-mode"
          onChange={changeDrawMode}
        />
        Canvas mode
      </Label>
      <Label>
        <Input
          type="radio"
          value="vector-mode"
          checked={drawMode === "vector-mode"}
          name="vectors-mode"
          onChange={changeDrawMode}
        />
        Vector mode
      </Label>
    </form>
  );
}

export { Controls };
