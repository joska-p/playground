import { getAllRules } from '@repo/sequence-engine/rules';
import type { Control, ControlSection } from '@repo/ui/ControlPanel';
import { setSeed, setSequenceRule, setSequenceSteps } from '../../stores/sequence/actions';
import { useSeed, useSequenceRule, useSequenceSteps } from '../../stores/sequence/selectors';

function useSequenceSection() {
  const sequenceRule = useSequenceRule();
  const steps = useSequenceSteps();
  const seed = useSeed();

  const ruleControl: Control = {
    id: 'rule',
    type: 'select',
    label: 'Rule',
    value: sequenceRule.id,
    options: getAllRules().map((r) => ({ label: r.name, value: r.id })),
    onChange: (v: string) => {
      const rule = getAllRules().find((r) => r.id === v);
      if (rule) setSequenceRule({ sequenceRule: rule });
    }
  };

  const stepsControl: Control = {
    id: 'steps',
    type: 'slider',
    label: 'Steps',
    value: steps,
    min: 2,
    max: sequenceRule.maxSteps,
    step: 1,
    onChange: (v: number) => setSequenceSteps({ steps: v })
  };

  const seedControl: Control = {
    id: 'seed',
    type: 'text',
    label: 'Seed',
    value: seed ?? '',
    onChange: (v: string) => setSeed(v || undefined)
  };

  const section: ControlSection = {
    id: 'sequence',
    label: 'Sequence',
    defaultOpen: true,
    controls: [ruleControl, stepsControl, seedControl]
  };

  return section;
}

export { useSequenceSection };
