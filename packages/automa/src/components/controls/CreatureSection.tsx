import { ControlRow, ControlSection } from '@repo/ui/control-panel';
import { Select } from '@repo/ui/data-entry';

import { allCreatures, type CreatureId } from '../../engine/creature/registry';
import { setPaletteBrush } from '../../stores/automa/actions';
import { usePaletteBrush } from '../../stores/automa/selectors';

function CreatureSection() {
    const paletteBrush = usePaletteBrush();

    return (
        <ControlSection
            title="Creature"
            defaultOpen
        >
            <ControlRow label="Pattern">
                <Select
                    value={paletteBrush}
                    onChange={(e) => {
                        setPaletteBrush(e.target.value as CreatureId);
                    }}
                >
                    {allCreatures.map((creature) => (
                        <option
                            key={creature.id}
                            value={creature.id}
                        >
                            {creature.name}
                        </option>
                    ))}
                </Select>
            </ControlRow>
        </ControlSection>
    );
}

export { CreatureSection };
