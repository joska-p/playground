import { pixel } from '@repo/pixel';
import { ControlPanel } from '@repo/ui/ControlPanel';
import type { Control, ControlSection } from '@repo/ui/ControlPanel/types';
import { iconMap } from '@repo/ui/icons';
import { useState } from 'react';
import { WORKFLOW_PRESETS } from '../../core/workflows/workflows';
import {
  addWorkflowStep,
  clearImageSource,
  clearOutputs,
  setWorkflowSteps
} from '../../stores/manipulator/actions';
import { useImageSource, useOutputs } from '../../stores/manipulator/selectors';
import { ImageSourceControls } from '../upload/ImageSourceControls';
import { WorkflowControls } from '../workflow/WorkflowControls';

function ControlsPanel() {
  const outputs = useOutputs();
  const imageSource = useImageSource();
  const [selectedManip, setSelectedManip] = useState(
    () => Object.keys(pixel.manipulations)[0] ?? ''
  );

  const manipulationIds = Object.keys(pixel.manipulations);
  const manipulationOptions = manipulationIds.map((id) => ({
    label: pixel.manipulations[id]?.name ?? id,
    value: id
  }));

  const presetsControl: Control[] = WORKFLOW_PRESETS.map((preset, i) => ({
    id: `preset-${String(i)}`,
    label: preset.name,
    type: 'button',
    variant: 'default',
    onClick: () => {
      setWorkflowSteps(
        preset.steps.map((step) => ({
          ...step,
          options: step.options ?? {},
          uid: crypto.randomUUID()
        }))
      );
    },
    tooltip: preset.description
  }));

  const manipulationsControls: Control[] = [
    {
      id: 'select-manip',
      label: 'Manipulation',
      type: 'select',
      value: selectedManip,
      options: manipulationOptions,
      onChange: (v: string) => {
        setSelectedManip(v);
      }
    },
    {
      id: 'add-step',
      label: 'Add to Workflow',
      type: 'button',
      variant: 'primary',
      onClick: () => {
        addWorkflowStep(selectedManip);
      }
    }
  ];

  const imageSourceControl: Control = {
    id: 'clear-source',
    label: 'Clear Source',
    type: 'button',
    variant: 'default',
    onClick: () => {
      clearImageSource();
    }
  } as const;

  const outputsControl: Control = {
    id: 'clear-outputs',
    label: 'Clear Outputs',
    type: 'button',
    variant: 'default',
    onClick: () => {
      clearOutputs();
    }
  };

  const ioSection: ControlSection = {
    id: 'input-output',
    label: 'Input Output',
    icon: iconMap.image,
    controls: []
  };

  if (imageSource) {
    ioSection.controls.push(imageSourceControl);
  }

  if (outputs.length > 0) {
    ioSection.controls.push(outputsControl);
  }

  const sections: ControlSection[] = [
    {
      id: 'presets',
      label: 'Presets',
      icon: iconMap.sparkles,
      controls: presetsControl
    },
    {
      id: 'manipulations',
      label: 'Manipulations',
      icon: iconMap.pipeline,
      controls: manipulationsControls
    }
  ];

  if (ioSection.controls.length > 0) {
    sections.push(ioSection);
  }

  return (
    <ControlPanel
      header={
        <div className="p-3">
          <ImageSourceControls />
        </div>
      }
      sections={sections}
      accordion={true}
      defaultOpenSections={['presets', 'manipulations']}
      footer={
        <div className="p-3">
          <WorkflowControls />
        </div>
      }
    />
  );
}

export { ControlsPanel };
