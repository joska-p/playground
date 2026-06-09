import { Select } from '@repo/ui/Select';
import { getAllCreatures } from '../../core/creature/registry.ts';
import { setPaletteBrush } from '../../stores/ui/actions.ts';
import { usePaletteBrush } from '../../stores/ui/selectors';

function CreatureSelector() {
  const paletteBrush = usePaletteBrush();
  const creatures = getAllCreatures();

  return (
    <div className="flex flex-col gap-2">
      <Select
        label="Creature"
        value={paletteBrush ?? ''}
        onChange={(e) => setPaletteBrush(e.target.value || null)}
      >
        <option value="">None</option>
        {creatures.map((creature) => (
          <option
            key={creature.id}
            value={creature.id}
          >
            {creature.name}
          </option>
        ))}
      </Select>
    </div>
  );
}

export { CreatureSelector };
