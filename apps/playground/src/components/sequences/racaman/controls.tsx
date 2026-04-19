import { Input, Label, Slider, Card } from "@repo/ui";
import { useRacamanContext } from "./racaman-context.js";

function Controls() {
  const { sequence, drawMode, updateSequence, changeDrawMode } =
    useRacamanContext();
  const iterations = Number(sequence.length);
  const handleChange = (val: number) => updateSequence(val);

  return (
    <Card className="m-4 p-4 w-fit">
      <div className="flex gap-4 items-center">
        <Label className="flex flex-col gap-2">
          <span className="text-sm font-medium">Iterations: {iterations}</span>
          <Slider
            min={10}
            max={2000}
            step={10}
            value={iterations}
            onChange={handleChange}
          />
        </Label>
        <Label>
          Canvas mode
          <Input
            type="radio"
            value="canvas-mode"
            checked={drawMode === "canvas-mode"}
            name="canvas-mode"
            onChange={changeDrawMode}
          />
        </Label>
        <Label>
          Vector mode
          <Input
            type="radio"
            value="vector-mode"
            checked={drawMode === "vector-mode"}
            name="vectors-mode"
            onChange={changeDrawMode}
          />
        </Label>
      </div>
    </Card>
  );
}

export { Controls };
