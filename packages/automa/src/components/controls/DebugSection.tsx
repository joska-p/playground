import { ControlGrid } from '@repo/ui/control-panel';
import { Checkbox } from '@repo/ui/data-entry';
import { useStepTimer } from '../../hooks/useStepTimer';
import { setShowDebug, useCols, useGeneration, useRows, useShowDebug } from '../../stores/automa';

function DebugSection() {
        const generation = useGeneration();
        const cols = useCols();
        const rows = useRows();
        const showDebug = useShowDebug();

        const { stepTime, roundTripTime } = useStepTimer(generation);

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
                                <div>step: {stepTime.toFixed(1)}ms</div>
                                <div>rtt: {roundTripTime.toFixed(1)}ms</div>
                        </div>
                </ControlGrid>
        );
}

export { DebugSection };
