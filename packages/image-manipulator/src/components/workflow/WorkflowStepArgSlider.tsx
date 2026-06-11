import type { ArgDefinition } from '@repo/image-pipeline';
import { Slider } from '@repo/ui/Slider';

type WorkflowStepArgSliderProps = {
  def: ArgDefinition;
  value: number;
  onChange: (value: number) => void;
};

function WorkflowStepArgSlider({
  def,
  value,
  onChange,
}: WorkflowStepArgSliderProps) {
  return (
    <Slider
      label={def.label}
      value={value}
      min={def.min}
      max={def.max}
      step={def.step}
      layout="inline"
      onChange={onChange}
      className="gap-4"
    />
  );
}

export { WorkflowStepArgSlider };
