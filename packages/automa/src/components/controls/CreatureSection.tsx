import { getAllCreatures } from '@repo/automa-engine/creature/registry';
import { ControlRow, ControlSection } from '@repo/ui/control-panel';
import { Select } from '@repo/ui/data-entry';
import { setPaletteBrush } from '../../stores/ui/actions';
import { usePaletteBrush } from '../../stores/ui/selectors';

function CreatureSection() {
  const paletteBrush = usePaletteBrush();
  const creatures = getAllCreatures();

  return (
    <ControlSection
      title="Creature"
      defaultOpen
    >
      <ControlRow label="Pattern">
        <Select
          value={paletteBrush ?? ''}
          onChange={(e) => {
            setPaletteBrush(e.target.value || null);
          }}
        >
          <option value="">None</option>
          {creatures.map((c) => (
            <option
              key={c.id}
              value={c.id}
            >
              {c.name}
            </option>
          ))}
        </Select>
      </ControlRow>
    </ControlSection>
  );
}

export { CreatureSection };
