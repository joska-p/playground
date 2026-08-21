import { ControlGrid, ControlSection } from '@repo/ui/control-panel';
import { Button } from '@repo/ui/data-entry';

import { clearGrid, randomizeGrid, setToolMode } from '../../stores/automa/actions';
import { useBrushMode } from '../../stores/automa/selectors';

function EditSection() {
    const brushMode = useBrushMode();

    return (
        <ControlSection
            title="Edit"
            defaultOpen
        >
            <ControlGrid columns={2}>
                <Button
                    onClick={() => {
                        randomizeGrid();
                    }}
                >
                    Randomize
                </Button>

                <Button
                    variant="destructive"
                    onClick={() => {
                        clearGrid();
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
