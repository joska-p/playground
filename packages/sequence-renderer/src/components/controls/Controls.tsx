import { Input, Label, Slider, Card } from "@repo/ui";
import { useSequenceContext } from "../Sequence-context.js";
import { SEQUENCE_GENERATORS } from "../generators/index.js";
import { SequenceSelector } from "./Sequence-selector.js";

function Controls() {
  const { sequenceType, iterations, setIterations, drawMode, setDrawMode } =
    useSequenceContext();

  const generator = SEQUENCE_GENERATORS[sequenceType];

  return (
    <Card className="grid md:grid-cols-3 items-center gap-4 border-t border-border/50 px-6">
      <SequenceSelector />

      <Label className="flex gap-2 items-center">
        Iterations: <span className="text-secondary">{iterations}</span>
        <Slider
          min={10}
          max={generator.maxIterations}
          step={10}
          value={iterations}
          onValueChange={setIterations}
          className="flex-1 accent-primary mt-0"
        />
      </Label>

      <Label className="flex gap-2 items-center">
        Canvas mode:
        <Input
          type="radio"
          value="canvas-mode"
          checked={drawMode === "canvas-mode"}
          onChange={() => setDrawMode("canvas-mode")}
        />
      </Label>
      <Label className="flex gap-2 items-center">
        Vector mode:
        <Input
          type="radio"
          value="vector-mode"
          checked={drawMode === "vector-mode"}
          onChange={() => setDrawMode("vector-mode")}
        />
      </Label>
    </Card>
  );
}

export { Controls };
