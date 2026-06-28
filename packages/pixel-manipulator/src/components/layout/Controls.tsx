import { ImageSourceControls } from '../upload/ImageSourceControls';
import { ManipulationSelector } from '../workflow/ManipulationSelector';
import { PresetSelector } from '../workflow/PresetSelector';
import { WorkflowControls } from '../workflow/WorkflowControls';
import { ControlSection } from './ControlSection';

function Controls() {
  return (
    <>
      <ControlSection title="Source">
        <ImageSourceControls />
      </ControlSection>

      <ControlSection title="Presets">
        <PresetSelector />
      </ControlSection>

      <ControlSection title="Manipulations">
        <ManipulationSelector />
      </ControlSection>

      <ControlSection title="Workflow">
        <WorkflowControls />
      </ControlSection>
    </>
  );
}

export { Controls };
