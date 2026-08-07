import { ControlGrid } from '@repo/ui/control-panel';
import { Checkbox } from '@repo/ui/data-entry';
import { setShowDebug, useCols, useGeneration, useRows, useShowDebug } from '../../stores/automa';

function DebugSection() {
    const generation = useGeneration();
    const cols = useCols();
    const rows = useRows();
    const showDebug = useShowDebug();

    return (
        <ControlGrid columns={2}>
            <Checkbox
                checked={showDebug}
                onChange={() => {
                    setShowDebug(!showDebug);
                }}
                label="overlay"
            />
            <div className="text-muted-foreground space-y-1 text-sm">
                <div>generation: {generation}</div>
                <div>
                    grid: {cols}&times;{rows}
                </div>
            </div>
        </ControlGrid>
    );
}

export { DebugSection };
