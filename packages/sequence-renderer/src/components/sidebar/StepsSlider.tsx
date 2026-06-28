import { Slider } from '@repo/ui/Slider';
import type { JSX } from 'react';
import { setSequenceSteps } from '../../stores/sequence/actions';
import { useSequenceRule, useSequenceSteps } from '../../stores/sequence/selectors';

function StepsSlider(): JSX.Element {
  const sequenceRule = useSequenceRule();
  const steps = useSequenceSteps();

  return (
    <Slider
      variant="secondary"
      layout="inline"
      label="Steps"
      min={2}
      max={sequenceRule.maxSteps}
      step={1}
      value={steps}
      onChange={(steps) => setSequenceSteps({ steps })}
    />
  );
}

export { StepsSlider };
