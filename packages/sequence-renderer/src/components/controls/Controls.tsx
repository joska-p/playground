import { Card } from "@repo/ui/Card";
import { Select } from "@repo/ui/Select";
import { Slider } from "@repo/ui/Slider";
import { visualizations } from "../../core/visualizations/visualizations";
import {
  setSequenceSteps,
  setSequenceVisualizationId,
  useSequenceRule,
  useSequenceSteps,
  useSequenceVisualizationId,
} from "../../store/sequenceStore";
import { SequenceSelector } from "./SequenceSelector";

function Controls() {
  const sequenceRule = useSequenceRule();
  const steps = useSequenceSteps();
  const visualizationId = useSequenceVisualizationId();

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
        onChange={setSequenceSteps}
        className="max-w-xs"
      />

      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Visualization:</span>
        <Select
          variant="primary"
          value={visualizationId}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setSequenceVisualizationId(e.target.value)
          }
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
