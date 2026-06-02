import { Button } from "@repo/ui/Button";
import { manipulations } from "../../../manipulations/manipulations";
import type { WorkflowStep } from "../../../store/workflowStore";
import {
  moveWorkflowStep,
  removeWorkflowStep,
  updateWorkflowStepOptions,
} from "../../../store/workflowStore";
import { WorkflowStepArgSlider } from "./WorkflowStepArgSlider";

type WorkflowStepItemProps = {
  step: WorkflowStep;
  index: number;
  isFirst: boolean;
  isLast: boolean;
};

function WorkflowStepItem({ step, index, isFirst, isLast }: WorkflowStepItemProps) {
  const manip = manipulations[step.id];

  return (
    <div className="py-1.5">
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-medium">
          {index + 1}. {manip?.name ?? step.id}
        </p>
        <div className="flex gap-0.5">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 "
            disabled={isFirst}
            onClick={() => moveWorkflowStep(index, -1)}
            aria-label="Move up"
          >
            ↑
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 "
            disabled={isLast}
            onClick={() => moveWorkflowStep(index, 1)}
            aria-label="Move down"
          >
            ↓
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 "
            onClick={() => removeWorkflowStep(index)}
            aria-label="Remove step"
          >
            ✕
          </Button>
        </div>
      </div>
      {manip && manip.argDefinitions.length > 0 && (
        <div className="mt-1 flex flex-col gap-1">
          {manip.argDefinitions.map((def) => (
            <WorkflowStepArgSlider
              key={def.key}
              def={def}
              value={step.options[def.key] ?? def.min}
              onChange={(value) =>
                updateWorkflowStepOptions(index, {
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

export { WorkflowStepItem };
