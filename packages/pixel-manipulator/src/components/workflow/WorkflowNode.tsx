import type { ArgDefinition } from '@repo/pixel';
import { ControlRow, ControlSubsection, Slider } from '@repo/ui';
import { updateStepOptions } from '../../stores/manipulator/actions';

import type { WorkflowStep } from '../../stores/manipulator/types';
import { WorkflowNodeControls } from './WorkflowNodeControls';

type WorkflowNodeProps = {
  step: WorkflowStep;
  index: number;
  name: string;
  argDefinitions: readonly ArgDefinition[];
};

function WorkflowNode({ step, index, name, argDefinitions }: WorkflowNodeProps) {
  return (
    <ControlSubsection
      title={name}
      defaultOpen={false}
    >
      <WorkflowNodeControls index={index} />
      {argDefinitions.map((def) => (
        <ControlRow
          key={def.key}
          label={def.label}
        >
          <Slider
            value={(step.options[def.key] as number | undefined) ?? def.min}
            min={def.min}
            max={def.max}
            step={def.step}
            onChange={(value) => {
              updateStepOptions(index, {
                ...step.options,
                [def.key]: value
              } as Record<string, number>);
            }}
          />
        </ControlRow>
      ))}
    </ControlSubsection>
  );
}

export { WorkflowNode };
export type { WorkflowNodeProps };
