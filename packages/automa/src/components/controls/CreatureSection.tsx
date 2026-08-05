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
