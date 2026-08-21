import { ControlSection } from '@repo/ui/control-panel';
import { Button } from '@repo/ui/data-entry';

import { UploadZone } from './UploadZone/UploadZone';
import { clearOutputs } from '../../stores/manipulator/actions';

function ImageSourceControls() {
    return (
        <ControlSection title="image source">
            <UploadZone />
            <Button
                variant="default"
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
