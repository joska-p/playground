import { Button, ControlSection } from '@repo/ui';
import { clearOutputs } from '../../stores/manipulator/actions';
import { UploadZone } from './UploadZone/UploadZone';

function ImageSourceControls() {
  return (
    <ControlSection title="image source">
      <UploadZone />
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          clearOutputs();
        }}
        className="self-end"
      >
        Clear Outputs
      </Button>
    </ControlSection>
  );
}

export { ImageSourceControls };
