import { useState } from 'react';
import type { ArgDefinition } from '../../core/manipulations/manipulations';
import {
  moveWorkflowStep,
  removeWorkflowStep,
  updateStepOptions,
} from '../../stores/manipulator/actions';
import type { WorkflowStep } from '../../stores/manipulator/types';
import { WorkflowNodeControls } from './WorkflowNodeControls';
import { WorkflowNodeHeader } from './WorkflowNodeHeader';
import { WorkflowStepArgSlider } from './WorkflowStepArgSlider';

type WorkflowNodeProps = {
  step: WorkflowStep;
  index: number;
  isFirst: boolean;
  isLast: boolean;
  name: string;
  argDefinitions: ArgDefinition[];
};

function WorkflowNode({
  step,
  index,
  isFirst,
  isLast,
  name,
  argDefinitions,
}: WorkflowNodeProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-card border-border rounded-lg border">
      <div className="flex items-center gap-2 px-3 py-2">
        <WorkflowNodeHeader
          index={index}
          name={name}
          hasArgs={argDefinitions.length > 0}
          expanded={expanded}
          onToggleExpand={() => setExpanded((v) => !v)}
        />

        <WorkflowNodeControls
          isFirst={isFirst}
          isLast={isLast}
          onMoveUp={() => moveWorkflowStep(index, -1)}
          onMoveDown={() => moveWorkflowStep(index, 1)}
          onRemove={() => removeWorkflowStep(index)}
        />
      </div>

      {argDefinitions.length > 0 && expanded && (
        <div className="border-border flex flex-col gap-2 border-t px-3 py-2">
          {argDefinitions.map((def) => (
            <WorkflowStepArgSlider
              key={def.key}
              def={def}
              value={step.options[def.key] ?? def.min}
              onChange={(value) =>
                updateStepOptions(index, {
                  ...step.options,
                  [def.key]: value,
                })
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}

export { WorkflowNode };
export type { WorkflowNodeProps };
