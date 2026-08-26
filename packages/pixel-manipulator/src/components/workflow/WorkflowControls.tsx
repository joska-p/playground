import { getManipulations } from '@repo/pixel/worker';
import { PanelSection } from '@repo/tlc/layout';

import { WorkEmptyStateSvg } from './WorkEmptyStateSvg';
import { WorkflowNode } from './WorkflowNode';
import { useWorkflowSteps } from '../../stores/manipulator/selectors';
import { EmptyState } from '../shared/EmptyState';

function WorkflowControls() {
    const steps = useWorkflowSteps();

    if (steps.length === 0) {
        return (
            <PanelSection label="workflow empty">
                <EmptyState
                    message="Add manipulations to build your pipeline"
                    icon={<WorkEmptyStateSvg />}
                />
            </PanelSection>
        );
    }

    return (
        <PanelSection label="workflow">
            {steps.map((step, index) => {
                const manip = getManipulations()[step.id];

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
        </PanelSection>
    );
}

export { WorkflowControls };
