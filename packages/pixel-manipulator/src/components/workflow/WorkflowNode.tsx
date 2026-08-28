import { FieldRow, Slider } from '@repo/tlc/components/forms';
import { PanelSection } from '@repo/tlc/layout';

import { WorkflowNodeControls } from './WorkflowNodeControls';
import { updateStepOptions } from '../../stores/manipulator/actions';

import type { WorkflowStep } from '../../stores/manipulator/types';
import type { ArgDefinition } from '@repo/pixel/processor';

interface WorkflowNodeProps {
    step: WorkflowStep;
    index: number;
    name: string;
    argDefinitions: readonly ArgDefinition[];
}

function WorkflowNode({ step, index, name, argDefinitions }: WorkflowNodeProps) {
    return (
        <PanelSection
            label={name}
            collapsible
            defaultOpen={false}
        >
            <WorkflowNodeControls index={index} />
            {argDefinitions.map((def) => (
                <FieldRow
                    key={def.key}
                    label={def.label}
                >
                    <Slider
                        value={(step.options[def.key] as number | undefined) ?? def.min}
                        min={def.min}
                        max={def.max}
                        step={def.step}
                        onChange={(value) => {
                            updateStepOptions(index, {
                                ...step.options,
                                [def.key]: value
                            } as Record<string, number>);
                        }}
                    />
                </FieldRow>
            ))}
        </PanelSection>
    );
}

export { WorkflowNode };
export type { WorkflowNodeProps };
