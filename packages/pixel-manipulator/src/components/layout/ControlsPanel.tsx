import { pixel } from '@repo/pixel';
import { ControlGrid, ControlPanel, ControlSection } from '@repo/ui/control-panel';
import { Button, Select } from '@repo/ui/data-entry';
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
    () => Object.keys(pixel.manipulations)[0] ?? ''
  );

  const manipulationIds = Object.keys(pixel.manipulations);
  const manipulationOptions = manipulationIds.map((id) => ({
    label: pixel.manipulations[id]?.name ?? id,
    value: id
  }));

  return (
    <ControlPanel title="controls">
      <ImageSourceControls />
      <ControlSection title="presets">
        <ControlGrid columns={2}>
          {WORKFLOW_PRESETS.map((preset) => (
            <Button
              key={preset.name}
              size="sm"
              tooltip={preset.description}
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
      </ControlSection>

      <ControlSection title="manipulation">
        <ControlGrid columns={2}>
          <Select
            id="select-manip"
            value={selectedManip}
            onChange={(e) => {
              setSelectedManip(e.target.value);
            }}
          >
            <option value="">Select a manipulation</option>
            {manipulationOptions.map((option) => (
              <option
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </Select>

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
      </ControlSection>

      <WorkflowControls />

      <ControlGrid columns={2}>
        <Button
          loading={isProcessing}
          onClick={() => void executeWorkflow()}
        >
          Execute workflow
        </Button>
        <Button
          loading={isProcessing}
          onClick={() => {
            clearWorkflowSteps();
          }}
        >
          Clear Workflow
        </Button>
      </ControlGrid>
    </ControlPanel>
  );
}

export { ControlsPanel };
