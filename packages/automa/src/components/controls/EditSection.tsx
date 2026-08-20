import { ControlGrid, ControlSection } from '@repo/ui/control-panel';
import { Button } from '@repo/ui/data-entry';
import { setToolMode, useBrushMode } from '../../stores/automa';
import { getSimulationEngine } from '../../engine/gpu/SimulationEngine';

function EditSection() {
    const brushMode = useBrushMode();
    const simulationEngine = getSimulationEngine();

    return (
        <ControlSection
            title="Edit"
            defaultOpen
        >
            <ControlGrid columns={2}>
                <Button
                    onClick={() => {
                        simulationEngine.randomize();
                    }}
                >
                    Randomize
                </Button>

                <Button
                    variant="destructive"
                    onClick={() => {
                        simulationEngine.clear();
                    }}
                >
                    Clear
                </Button>

                <Button
                    isActive={brushMode === 'draw'}
                    variant="secondary"
                    onClick={() => {
                        setToolMode('draw');
                    }}
                >
                    Draw
                </Button>
                <Button
                    isActive={brushMode === 'erase'}
                    variant="warning"
                    onClick={() => {
                        setToolMode('erase');
                    }}
                >
                    Erase
                </Button>
            </ControlGrid>
        </ControlSection>
    );
}

export { EditSection };
