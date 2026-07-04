import { Button, ControlRow, ControlSection, Select } from '@repo/ui';
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
      <ControlRow label="">
        <Button
          variant="destructive"
          onClick={() => {
            clear();
          }}
        >
          Clear
        </Button>
        <Button
          onClick={() => {
            randomize();
          }}
        >
          Randomize
        </Button>
      </ControlRow>
      <ControlRow label="Brush">
        <Select
          value={brushMode}
          onChange={(e) => {
            setToolMode(e.target.value as 'draw' | 'erase');
          }}
        >
          <option value="draw">Draw</option>
          <option value="erase">Erase</option>
        </Select>
      </ControlRow>
    </ControlSection>
  );
}

export { EditSection };
