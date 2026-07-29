import { allCreatures, type CreatureId } from '@repo/automa-engine/creature/registry';
import { ControlRow, ControlSection } from '@repo/ui/control-panel';
import { Select } from '@repo/ui/data-entry';
import { setPaletteBrush, usePaletteBrush } from '../../stores/automa';

function CreatureSection() {
  const paletteBrush = usePaletteBrush();

  return (
    <ControlSection
      title="Creature"
      defaultOpen
    >
      <ControlRow label="Pattern">
        <Select
          value={paletteBrush ?? ''}
          onChange={(e) => {
            setPaletteBrush(e.target.value as CreatureId);
          }}
        >
          <option value="">None</option>
          {allCreatures.map((c) => (
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
