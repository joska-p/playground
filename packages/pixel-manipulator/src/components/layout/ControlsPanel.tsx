import { getManipulations } from '@repo/pixel/worker';
import { ControlGrid } from '@repo/tlc/components/forms';
import { Button, Select } from '@repo/tlc/components/forms';
import { Panel, PanelSection } from '@repo/tlc/layout';
import { useState } from 'react';

import { WORKFLOW_PRESETS } from '../../core/workflows/workflows';
import {
    addWorkflowStep,
    clearWorkflowSteps,
    executeWorkflow,
    setWorkflowSteps
} from '../../stores/manipulator/actions';
import { useIsProcessing } from '../../stores/manipulator/selectors';
import { ImageSourceControls } from '../upload/ImageSourceControls';
import { WorkflowControls } from '../workflow/WorkflowControls';

function ControlsPanel() {
    const isProcessing = useIsProcessing();
    const [selectedManip, setSelectedManip] = useState(
        () => Object.keys(getManipulations())[0] ?? ''
    );

    const manipulationIds = Object.keys(getManipulations());
    const manipulationOptions = manipulationIds.map((id) => ({
        label: getManipulations()[id].name,
        value: id
    }));

    return (
        <Panel title="controls">
            <ImageSourceControls />
            <PanelSection label="presets">
                <ControlGrid columns={2}>
                    {WORKFLOW_PRESETS.map((preset) => (
                        <Button
                            key={preset.name}
                            size="sm"
                            onClick={() => {
                                setWorkflowSteps(
                                    preset.steps.map((step) => ({
                                        ...step,
                                        options: step.options ?? {},
                                        uid: crypto.randomUUID()
                                    }))
                                );
                            }}
                        >
                            {preset.name}
                        </Button>
                    ))}
                </ControlGrid>
            </PanelSection>

            <PanelSection label="manipulation">
                <ControlGrid columns={2}>
                    <Select
                        id="select-manip"
                        value={selectedManip}
                        onChange={(val) => {
                            setSelectedManip(val);
                        }}
                        options={manipulationOptions}
                    />

                    <Button
                        id="add-step"
                        variant="primary"
                        onClick={() => {
                            addWorkflowStep(selectedManip);
                        }}
                    >
                        Add to Workflow
                    </Button>
                </ControlGrid>
            </PanelSection>

            <WorkflowControls />

            <ControlGrid columns={2}>
                <Button
                    disabled={isProcessing}
                    onClick={() => void executeWorkflow()}
                >
                    Execute workflow
                </Button>
                <Button
                    disabled={isProcessing}
                    onClick={() => {
                        clearWorkflowSteps();
                    }}
                >
                    Clear Workflow
                </Button>
            </ControlGrid>
        </Panel>
    );
}

export { ControlsPanel };
