import type { WorkflowStep } from "../../../store/manipulatorStore";
import { WorkflowStepItem } from "./WorkflowStepItem";

type WorkflowProps = {
  steps: WorkflowStep[];
};

function Workflow({ steps }: WorkflowProps) {
  if (steps.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-3">
      {steps.map((step, index) => (
        <WorkflowStepItem key={index} step={step} index={index} />
      ))}
    </div>
  );
}

export { Workflow };
