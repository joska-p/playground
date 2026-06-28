import type { ArgDefinition } from '@repo/pixel';
import {
  moveWorkflowStep,
  removeWorkflowStep,
  updateStepOptions
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
  argDefinitions: readonly ArgDefinition[];
};

function WorkflowNode({ step, index, isFirst, isLast, name, argDefinitions }: WorkflowNodeProps) {
  return (
    <li className="bg-card border-border rounded-lg border">
      <header className="flex items-center gap-2 px-3 py-2">
        <WorkflowNodeHeader
          index={index}
          name={name}
        />

        <WorkflowNodeControls
          isFirst={isFirst}
          isLast={isLast}
          onMoveUp={() => moveWorkflowStep(index, -1)}
          onMoveDown={() => moveWorkflowStep(index, 1)}
          onRemove={() => removeWorkflowStep(index)}
        />
      </header>

      {argDefinitions.length > 0 && (
        <section className="border-border flex flex-col gap-2 border-t px-3 py-2">
          {argDefinitions.map((def) => (
            <WorkflowStepArgSlider
              key={def.key}
              def={def}
              value={(step.options[def.key] as number | undefined) ?? def.min}
              onChange={(value) =>
                updateStepOptions(index, {
                  ...step.options,
                  [def.key]: value
                } as Record<string, number>)
              }
            />
          ))}
        </section>
      )}
    </li>
  );
}

export { WorkflowNode };
export type { WorkflowNodeProps };
