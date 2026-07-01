import { Button } from '@repo/ui/Button';
import { clearOutputs } from '../../stores/manipulator/actions';
import { UploadZone } from './UploadZone';

function ImageSourceControls() {
  return (
    <div className="flex flex-col gap-2">
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
    </div>
  );
}

export { ImageSourceControls };
