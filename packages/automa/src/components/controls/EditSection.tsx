import { ControlGrid } from '@repo/tlc/components/forms';
import { Button } from '@repo/tlc/components/forms';
import { PanelSection } from '@repo/tlc/layout';

import { clearGrid, randomizeGrid, setToolMode } from '../../stores/automa/actions';
import { useBrushMode } from '../../stores/automa/selectors';

function EditSection() {
    const brushMode = useBrushMode();

    return (
        <PanelSection
            label="Edit"
            collapsible={false}
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
                    variant={brushMode === 'draw' ? 'secondary' : 'default'}
                    onClick={() => {
                        setToolMode('draw');
                    }}
                >
                    Draw
                </Button>
                <Button
                    variant={brushMode === 'erase' ? 'destructive' : 'default'}
                    onClick={() => {
                        setToolMode('erase');
                    }}
                >
                    Erase
                </Button>
            </ControlGrid>
        </PanelSection>
    );
}

export { EditSection };
