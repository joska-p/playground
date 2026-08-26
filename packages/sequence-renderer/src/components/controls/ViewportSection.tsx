import { Button } from '@repo/tlc/components/forms';
import { PanelSection } from '@repo/tlc/layout';

import { resetViewport } from '../../stores/ui/actions';

function ViewportSection() {
    return (
        <PanelSection
            label="Viewport"
            defaultOpen={true}
        >
            <Button onClick={resetViewport}>Reset</Button>
        </PanelSection>
    );
}

export { ViewportSection };
