import { Slider } from "@repo/ui/Slider";
import type { ArgDefinition } from "../../manipulations/manipulation.types";

type WorkflowStepArgSliderProps = {
  def: ArgDefinition;
  value: number;
  onChange: (value: number) => void;
};

function WorkflowStepArgSlider({ def, value, onChange }: WorkflowStepArgSliderProps) {
  return (
    <Slider
      label={def.label}
      value={value}
      min={def.min}
      max={def.max}
      step={def.step}
      layout="horizontal"
      onChange={onChange}
    />
  );
}

export { WorkflowStepArgSlider };
