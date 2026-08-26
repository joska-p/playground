import { FieldRow } from '@repo/tlc/components/forms';
import { Select } from '@repo/tlc/components/forms';
import { PanelSection } from '@repo/tlc/layout';

import { allCreatures, type CreatureId } from '../../engine/creature/registry';
import { setPaletteBrush } from '../../stores/automa/actions';
import { usePaletteBrush } from '../../stores/automa/selectors';

function CreatureSection() {
    const paletteBrush = usePaletteBrush();

    return (
        <PanelSection
            label="Creature"
            collapsible={false}
        >
            <FieldRow label="Pattern">
                <Select
                    value={paletteBrush}
                    onChange={(value) => {
                        setPaletteBrush(value as CreatureId);
                    }}
                    options={allCreatures.map((creature) => ({
                        label: creature.name,
                        value: creature.id
                    }))}
                />
            </FieldRow>
        </PanelSection>
    );
}

export { CreatureSection };
