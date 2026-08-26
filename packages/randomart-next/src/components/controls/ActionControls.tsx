import { ControlGrid, Button } from '@repo/tlc/components/forms';

import { DownloadButton } from './DownloadButton';
import { StateIOButtons } from './StateIOButtons';
import { setSeedText } from '../../stores/randomart/actions/config';

function ActionControls() {
    return (
        <ControlGrid columns={4}>
            <Button
                size="sm"
                onClick={() => {
                    setSeedText(Math.random().toString(36).slice(2, 10));
                }}
            >
                Rand
            </Button>
            <DownloadButton />
            <StateIOButtons />
        </ControlGrid>
    );
}

export { ActionControls };
