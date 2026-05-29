import { manipulations } from "../../../manipulations/manipulations";
import type { WorkflowStep } from "../../../store/manipulatorStore";
import { updateManipulatorWorkflowStepArgs } from "../../../store/manipulatorStore";
import { WorkflowStepArgSlider } from "./WorkflowStepArgSlider";

type WorkflowStepItemProps = {
  step: WorkflowStep;
  index: number;
};

function WorkflowStepItem({ step, index }: WorkflowStepItemProps) {
  const manip = manipulations[step.id];

  return (
    <div>
      <p className="text-sm">
        {index + 1}. {manip.name}
      </p>
      {manip.argDefinitions.length > 0 && (
        <div className="ml-4 mt-1 flex flex-col gap-2">
          {manip.argDefinitions.map((def) => (
            <WorkflowStepArgSlider
              key={def.key}
              def={def}
              value={step.args[def.key] ?? def.min}
              onChange={(value) =>
                updateManipulatorWorkflowStepArgs(index, {
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
