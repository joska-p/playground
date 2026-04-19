import { Input, Label, Slider, Card } from "@repo/ui";
import { useSequenceContext } from "../Sequence-context.js";
import { SEQUENCE_GENERATORS } from "../generators/index.js";
import { SequenceSelector } from "./Sequence-selector.js";

function Controls() {
  const { sequenceType, iterations, setIterations, drawMode, setDrawMode } =
    useSequenceContext();

  const generator = SEQUENCE_GENERATORS[sequenceType];

  return (
    <Card className="flex flex-row flex-wrap items-center gap-8 px-6 py-3 w-full rounded-none border-x-0 border-t-2 border-t-primary/20 bg-muted/30 backdrop-blur-md">
      <SequenceSelector />

      <Label className="flex items-center gap-4 flex-1 min-w-[200px] text-muted-foreground hover:text-foreground transition-colors">
        <span className="text-sm font-bold whitespace-nowrap">
          Iterations: <span className="text-secondary">{iterations}</span>
        </span>
        <Slider
          min={10}
          max={generator.maxIterations}
          step={10}
          value={iterations}
          onChange={setIterations}
          className="flex-1 accent-primary"
        />
      </Label>

      <div className="flex gap-6 border-l border-border/50 pl-6 h-8 items-center">
        <Label className="flex items-center gap-2 text-sm cursor-pointer hover:text-primary transition-colors">
          <Input
            type="radio"
            value="canvas-mode"
            checked={drawMode === "canvas-mode"}
            onChange={() => setDrawMode("canvas-mode")}
            className="w-4 h-4 accent-primary"
          />
          Canvas
        </Label>
        <Label className="flex items-center gap-2 text-sm cursor-pointer hover:text-primary transition-colors">
          <Input
            type="radio"
            value="vector-mode"
            checked={drawMode === "vector-mode"}
            onChange={() => setDrawMode("vector-mode")}
            className="w-4 h-4 accent-primary"
          />
          Vector
        </Label>
      </div>
    </Card>
  );
}

export { Controls };
