import { Card } from "@repo/ui/Card";
import { Select } from "@repo/ui/Select";
import { Slider } from "@repo/ui/Slider";
import { useShallow } from "zustand/shallow";
import { visualizations } from "../../core/visualizations/visualizations";
import { setSteps, setVisualizationId, useSequenceStore } from "../../store/useSequenceStore";
import { SequenceSelector } from "./SequenceSelector";

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
        layout="horizontal"
        label="Steps"
        min={2}
        max={sequenceRule.maxSteps}
        step={1}
        value={steps}
        onChange={setSteps}
        className="max-w-xs"
      />

      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Visualization:</span>
        <Select
          variant="primary"
          value={visualizationId}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setVisualizationId(e.target.value)}
          className="w-auto min-w-[140px]"
        >
          {visualizations.map((v: { id: string; name: string }) => (
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
