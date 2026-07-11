import { ControlGrid, ControlSection } from '@repo/ui/control-panel';
import { Button } from '@repo/ui/data-entry';
import { clear, randomize } from '../../stores/simulation/actions';
import { setToolMode } from '../../stores/ui/actions';
import { useBrushMode } from '../../stores/ui/selectors';

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
            randomize();
          }}
        >
          Randomize
        </Button>

        <Button
          variant="destructive"
          onClick={() => {
            clear();
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
