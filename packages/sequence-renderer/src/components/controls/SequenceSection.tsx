import { allRules } from '@repo/sequence-engine/rules';
import { ControlRow, ControlSection, Input, Select, Slider } from '@repo/ui';
import { setSeed, setSequenceRule, setSequenceSteps } from '../../stores/sequence/actions';
import { useSeed, useSequenceRule, useSequenceSteps } from '../../stores/sequence/selectors';

function SequenceSection() {
  const sequenceRule = useSequenceRule();
  const steps = useSequenceSteps();
  const seed = useSeed();

  return (
    <ControlSection
      title="Sequence"
      defaultOpen={true}
    >
      <ControlRow label="Rule">
        <Select
          value={sequenceRule.id}
          onChange={(e) => {
            const selectedRule = allRules.find((rule) => rule.id === e.target.value);
            if (selectedRule) {
              setSequenceRule({ sequenceRule: selectedRule });
            }
          }}
        >
          {allRules.map((rule) => (
            <option
              key={rule.id}
              value={rule.id}
            >
              {rule.name}
            </option>
          ))}
        </Select>
      </ControlRow>
      <ControlRow
        label="Steps"
        value={steps}
      >
        <Slider
          value={steps}
          min={1}
          max={sequenceRule.maxSteps}
          step={1}
          onChange={(e) => {
            setSequenceSteps({ steps: Number(e.target.value) });
          }}
          showTicks={false}
        />
      </ControlRow>
      <ControlRow label="Seed">
        <Input
          type="text"
          value={seed}
          onChange={(e) => {
            setSeed(e.target.value);
          }}
        />
      </ControlRow>
    </ControlSection>
  );
}

export { SequenceSection };
