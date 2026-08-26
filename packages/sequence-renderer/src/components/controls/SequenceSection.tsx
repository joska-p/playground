import { allRules } from '@repo/sequence-engine/rules';
import { FieldRow, Input, Select, Slider } from '@repo/tlc/components/forms';
import { PanelSection } from '@repo/tlc/layout';

import { setSeed, setSequenceRule, setSequenceSteps } from '../../stores/sequence/actions';
import { useSeed, useSequenceRule, useSequenceSteps } from '../../stores/sequence/selectors';

function SequenceSection() {
    const sequenceRule = useSequenceRule();
    const steps = useSequenceSteps();
    const seed = useSeed();

    return (
        <PanelSection
            label="Sequence"
            defaultOpen={true}
        >
            <FieldRow label="Rule">
                <Select
                    value={sequenceRule.id}
                    onChange={(val) => {
                        const selectedRule = allRules.find((rule) => rule.id === val);

                        if (selectedRule) {
                            setSequenceRule({
                                sequenceRule: selectedRule
                            });
                        }
                    }}
                    options={allRules.map((rule) => ({
                        label: rule.name,
                        value: rule.id
                    }))}
                />
            </FieldRow>
            <FieldRow
                label="Steps"
                value={String(steps)}
            >
                <Slider
                    value={steps}
                    min={1}
                    max={sequenceRule.maxSteps}
                    step={1}
                    onChange={(value) => {
                        setSequenceSteps({ steps: value });
                    }}
                />
            </FieldRow>
            <FieldRow label="Seed">
                <Input
                    type="text"
                    value={seed}
                    onChange={(e) => {
                        setSeed(e.target.value);
                    }}
                />
            </FieldRow>
        </PanelSection>
    );
}

export { SequenceSection };
