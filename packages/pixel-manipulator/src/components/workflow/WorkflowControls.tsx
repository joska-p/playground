import { pixel } from '@repo/pixel';
import { ControlSection } from '@repo/ui/control-panel';
import { useWorkflowSteps } from '../../stores/manipulator/selectors';
import { EmptyState } from '../shared/EmptyState';
import { WorkEmptyStateSvg } from './WorkEmptyStateSvg';
import { WorkflowNode } from './WorkflowNode';

function WorkflowControls() {
  const steps = useWorkflowSteps();

  if (steps.length === 0) {
    return (
      <ControlSection title="workflow empty">
        <EmptyState
          message="Add manipulations to build your pipeline"
          icon={<WorkEmptyStateSvg />}
        />
      </ControlSection>
    );
  }

  return (
    <ControlSection title="workflow">
      {steps.map((step, index) => {
        const manip = pixel.manipulations[step.id];
        if (!manip)
          return <p key={step.uid}>Step number: {step.id} that is not a valid manipulation</p>;

        return (
          <WorkflowNode
            key={step.uid}
            step={step}
            index={index}
            name={manip.name}
            argDefinitions={manip.argDefinitions}
          />
        );
      })}
    </ControlSection>
  );
}

export { WorkflowControls };
