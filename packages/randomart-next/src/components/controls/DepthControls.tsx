import { FieldRow, Slider } from '@repo/tlc/components/forms';
import { PanelSection } from '@repo/tlc/layout';

import { setMaxDepth, setMinDepth } from '../../stores/randomart/actions/config';
import { useMaxDepth, useMinDepth } from '../../stores/randomart/selectors';

function DepthControls() {
    const minDepth = useMinDepth();
    const maxDepth = useMaxDepth();

    return (
        <PanelSection label="Depth">
            <FieldRow label={`Min: ${String(minDepth)}`}>
                <div className="flex items-center gap-2">
                    <Slider
                        min={1}
                        max={12}
                        step={1}
                        value={minDepth}
                        onChange={setMinDepth}
                    />
                    <span className="text-foreground-dim w-6 text-right font-mono text-xs">
                        {minDepth}
                    </span>
                </div>
            </FieldRow>

            <FieldRow label={`Max: ${String(maxDepth)}`}>
                <div className="flex items-center gap-2">
                    <Slider
                        min={1}
                        max={16}
                        step={1}
                        value={maxDepth}
                        onChange={setMaxDepth}
                    />
                    <span className="text-foreground-dim w-6 text-right font-mono text-xs">
                        {maxDepth}
                    </span>
                </div>
            </FieldRow>
        </PanelSection>
    );
}

export { DepthControls };
