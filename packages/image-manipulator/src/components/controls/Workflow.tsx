import { Slider } from "@repo/ui/Slider";
import { manipulations } from "../../manipulations/manipulations";
import type { WorkflowStep } from "../../store/manipulatorStore";
import { updateManipulatorWorkflowStepArgs } from "../../store/manipulatorStore";

type WorkflowProps = {
  steps: WorkflowStep[];
};

function Workflow({ steps }: WorkflowProps) {
  if (steps.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-3">
      {steps.map((step, index) => {
        const manip = manipulations[step.id];
        return (
          <div key={index}>
            <p className="text-sm">
              {index + 1}. {manip.name}
            </p>
            {manip.argDefinitions.length > 0 && (
              <div className="ml-4 mt-1 flex flex-col gap-2">
                {manip.argDefinitions.map((def) => (
                  <Slider
                    key={def.key}
                    label={def.label}
                    value={step.args[def.key] ?? def.min}
                    min={def.min}
                    max={def.max}
                    step={def.step}
                    layout="horizontal"
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
      })}
    </div>
  );
}

export { Workflow };
