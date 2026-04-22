import { Input, Label, Slider, Card } from "@repo/ui";
import { useSequenceStore } from "../../store/useSequenceStore.js";
import { SequenceSelector } from "./SequenceSelector.js";
import { setSteps, setDrawMode } from "../../store/useSequenceStore.js";
import { useShallow } from "zustand/shallow";

function Controls() {
  const { sequenceRule, steps, drawMode } = useSequenceStore(
    useShallow((state) => ({
      sequenceRule: state.sequenceRule,
      steps: state.steps,
      drawMode: state.drawMode,
    }))
  );

  return (
    <Card className="flex flex-row flex-wrap justify-center items-center gap-8 px-6 py-3 w-full rounded-none border-x-0 border-t-2 border-t-primary/20 bg-muted/30 backdrop-blur-md">
      <SequenceSelector />

      <Label className="flex items-center gap-4 text-muted-foreground hover:text-foreground transition-colors">
        <span className="text-sm font-bold whitespace-nowrap">
          Steps: <span className="text-secondary">{steps}</span>
        </span>
        <Slider
          min={2}
          max={sequenceRule.maxSteps}
          step={1}
          value={steps > sequenceRule.maxSteps ? Math.floor(sequenceRule.maxSteps / 2) : steps}
          onChange={setSteps}
          className="accent-primary w-auto mt-0"
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
