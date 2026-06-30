import { pixel } from '@repo/pixel';
import type { Control, ControlSection } from '@repo/ui/ControlPanel';
import { ControlPanel } from '@repo/ui/ControlPanel';
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

  const sections: ControlSection[] = [
    {
      id: 'presets',
      label: 'Presets',
      icon: iconMap['sparkles'],
      controls: WORKFLOW_PRESETS.map(
        (preset, i) =>
          ({
            id: `preset-${i}`,
            label: preset.name,
            type: 'button',
            variant: 'default',
            onClick: () =>
              setWorkflowSteps(
                preset.steps.map((step) => ({
                  ...step,
                  options: step.options ?? {},
                  uid: crypto.randomUUID()
                }))
              ),
            tooltip: preset.description
          }) as Control
      )
    },
    {
      id: 'manipulations',
      label: 'Manipulations',
      icon: iconMap['pipeline'],
      controls: [
        {
          id: 'select-manip',
          label: 'Manipulation',
          type: 'select' as const,
          value: selectedManip,
          options: manipulationOptions,
          onChange: (v: string) => setSelectedManip(v)
        } as Control,
        {
          id: 'add-step',
          label: 'Add to Workflow',
          type: 'button' as const,
          variant: 'primary' as const,
          onClick: () => addWorkflowStep(selectedManip)
        }
      ]
    }
  ];

  if (outputs.length > 0 || imageSource) {
    sections.push({
      id: 'source',
      label: 'Source',
      icon: iconMap['image'],
      controls: [
        ...(imageSource
          ? [
              {
                id: 'clear-source',
                label: 'Clear Source',
                type: 'button' as const,
                variant: 'default' as const,
                onClick: () => clearImageSource()
              } as Control
            ]
          : []),
        ...(outputs.length > 0
          ? [
              {
                id: 'clear-outputs',
                label: 'Clear Outputs',
                type: 'button' as const,
                variant: 'danger' as const,
                onClick: () => clearOutputs()
              } as Control
            ]
          : [])
      ]
    });
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
