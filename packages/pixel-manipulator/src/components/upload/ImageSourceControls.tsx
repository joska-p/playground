import { Button } from '@repo/tlc/components/forms';
import { PanelSection } from '@repo/tlc/layout';

import { UploadZone } from './UploadZone/UploadZone';
import { clearOutputs } from '../../stores/manipulator/actions';

function ImageSourceControls() {
    return (
        <PanelSection label="image source">
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
        </PanelSection>
    );
}

export { ImageSourceControls };
