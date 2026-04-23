import { Slider, Card, Select } from "@repo/ui";
import { useSequenceStore } from "../../store/useSequenceStore.js";
import { SequenceSelector } from "./SequenceSelector.js";
import { setSteps, setVisualizationId } from "../../store/useSequenceStore.js";
import { visualizations } from "../../core/visualizations/index.js";
import { useShallow } from "zustand/shallow";

function Controls() {
  const { sequenceRule, steps, visualizationId } = useSequenceStore(
    useShallow((state) => ({
      sequenceRule: state.sequenceRule,
      steps: state.steps,
      visualizationId: state.visualizationId,
    }))
  );

  return (
    <Card className="border-t-primary/20 bg-muted/30 flex w-full flex-row flex-wrap items-center justify-center gap-8 rounded-none border-x-0 border-t-2 px-6 py-3 backdrop-blur-md">
      <SequenceSelector />

      <Slider
        variant="secondary"
        label="Steps"
        min={2}
        max={sequenceRule.maxSteps}
        step={1}
        value={steps}
        onChange={setSteps}
        className="mt-0 w-auto"
      />

      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Visualization:</span>
        <Select
          variant="primary"
          value={visualizationId}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setVisualizationId(e.target.value)}
          className="w-auto min-w-[140px]"
        >
          {visualizations.map((v) => (
            <option key={v.id} value={v.id}>
              {v.name}
            </option>
          ))}
        </Select>
      </div>
    </Card>
  );
}

export { Controls };
