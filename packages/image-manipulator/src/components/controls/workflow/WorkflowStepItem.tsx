import { Button } from "@repo/ui/Button";
import { manipulations } from "../../../manipulations/manipulations";
import type { WorkflowStep } from "../../../store/workflowStore";
import {
  moveWorkflowStep,
  removeWorkflowStep,
  updateWorkflowStepArgs,
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
    <div className="rounded-md border p-2">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">
          {index + 1}. {manip.name}
        </p>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            disabled={isFirst}
            onClick={() => moveWorkflowStep(index, -1)}
            aria-label="Move up"
          >
            ↑
          </Button>
          <Button
            variant="ghost"
            size="icon"
            disabled={isLast}
            onClick={() => moveWorkflowStep(index, 1)}
            aria-label="Move down"
          >
            ↓
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => removeWorkflowStep(index)}
            aria-label="Remove step"
          >
            ✕
          </Button>
        </div>
      </div>
      {manip.argDefinitions.length > 0 && (
        <div className="ml-4 mt-1 flex flex-col gap-2">
          {manip.argDefinitions.map((def) => (
            <WorkflowStepArgSlider
              key={def.key}
              def={def}
              value={step.args[def.key] ?? def.min}
              onChange={(value) =>
                updateWorkflowStepArgs(index, {
                  ...step.args,
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
