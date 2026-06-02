import { Slider } from "@repo/ui/Slider";

type ArgDefinition = { key: string; label: string; min: number; max: number; step: number };

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
      className="gap-4"
    />
  );
}

export { WorkflowStepArgSlider };
