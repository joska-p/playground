import { Input, Label, Slider, Card } from "@repo/ui";
import { useSequenceContext } from "../Sequence-context.js";
import { SEQUENCE_GENERATORS } from "../generators/index.js";
import { SequenceSelector } from "./Sequence-selector.js";

function Controls() {
  const { sequenceType, iterations, setIterations, drawMode, setDrawMode } =
    useSequenceContext();

  const generator = SEQUENCE_GENERATORS[sequenceType];

  return (
    <Card className="flex flex-row flex-wrap items-center gap-8 px-6 py-3 w-full rounded-none border-x-0 border-b-0">
      <SequenceSelector />

      <Label className="flex items-center gap-4 flex-1 min-w-[200px]">
        <span className="text-sm font-medium whitespace-nowrap">
          Iterations: {iterations}
        </span>
        <Slider
          min={10}
          max={generator.maxIterations}
          step={10}
          value={iterations}
          onChange={setIterations}
          className="flex-1 mt-0"
        />
      </Label>

      <div className="flex gap-8 border-l pl-6 items-center">
        <Label className="flex items-center gap-2 text-sm cursor-pointer">
          <Input
            type="radio"
            value="canvas-mode"
            checked={drawMode === "canvas-mode"}
            onChange={() => setDrawMode("canvas-mode")}
            className="w-4 h-4"
          />
          Canvas
        </Label>
        <Label className="flex items-center gap-2 text-sm cursor-pointer">
          <Input
            type="radio"
            value="vector-mode"
            checked={drawMode === "vector-mode"}
            onChange={() => setDrawMode("vector-mode")}
            className="w-4 h-4"
          />
          Vector
        </Label>
      </div>
    </Card>
  );
}

export { Controls };
