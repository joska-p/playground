import { useState } from 'react';
import { useWorkflowSteps } from '../../stores/manipulator/selectors';
import { ImageSourceControls } from '../upload/ImageSourceControls';
import { ManipulationSelector } from '../workflow/ManipulationSelector';
import { PresetSelector } from '../workflow/PresetSelector';
import { WorkflowControls } from '../workflow/WorkflowControls';
import { ControlSection } from './ControlSection';

type Section = 'source' | 'presets' | 'manipulations' | 'workflow';

function Controls() {
  const workflow = useWorkflowSteps();
  const [openSection, setOpenSection] = useState<Section | undefined>(
    workflow.length > 0 ? 'workflow' : 'source'
  );

  function toggleSection(section: Section) {
    setOpenSection((prev) => (prev === section ? undefined : section));
  }

  return (
    <div className="flex w-72 flex-col gap-2 p-2">
      <ControlSection
        title="Source"
        isOpen={openSection === 'source'}
        onToggle={() => toggleSection('source')}
      >
        <ImageSourceControls />
      </ControlSection>

      <ControlSection
        title="Presets"
        isOpen={openSection === 'presets'}
        onToggle={() => toggleSection('presets')}
      >
        <PresetSelector />
      </ControlSection>

      <ControlSection
        title="Manipulations"
        isOpen={openSection === 'manipulations'}
        onToggle={() => toggleSection('manipulations')}
      >
        <ManipulationSelector />
      </ControlSection>

      <ControlSection
        title="Workflow"
        isOpen={openSection === 'workflow'}
        onToggle={() => toggleSection('workflow')}
      >
        <WorkflowControls />
      </ControlSection>
    </div>
  );
}

export { Controls };
