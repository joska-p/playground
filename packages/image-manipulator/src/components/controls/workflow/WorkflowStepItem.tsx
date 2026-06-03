import { manipulations } from "../../../core/manipulations/manipulations";
import type { WorkflowStep } from "../../../store/workflowStore";
import { WorkflowNode } from "./WorkflowNode";

type WorkflowStepItemProps = {
  step: WorkflowStep;
  index: number;
  isFirst: boolean;
  isLast: boolean;
};

function WorkflowStepItem({ step, index, isFirst, isLast }: WorkflowStepItemProps) {
  const manip = manipulations[step.id];
  if (!manip) return null;

  return (
    <WorkflowNode
      step={step}
      index={index}
      isFirst={isFirst}
      isLast={isLast}
      name={manip.name}
      argDefinitions={manip.argDefinitions}
    />
  );
}

export { WorkflowStepItem };
