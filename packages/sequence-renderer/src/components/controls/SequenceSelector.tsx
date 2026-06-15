import { Select } from '@repo/ui/Select';
import type { ChangeEvent, JSX } from 'react';
import { getAllRules } from '../../core/rules/registry';
import { setSequenceRule, useSequenceRule } from '../../store/sequenceStore';

function SequenceSelector(): JSX.Element {
  const sequenceRule = useSequenceRule();

  function handleChange(e: ChangeEvent<HTMLSelectElement>): void {
    const selectedRule = getAllRules().find(
      (rule) => rule.id === e.target.value
    );
    if (selectedRule) setSequenceRule({ sequenceRule: selectedRule });
  }

  return (
    <div className="flex min-w-50 items-center gap-2 whitespace-nowrap">
      <span className="text-sm font-medium">Sequence:</span>
      <Select
        variant="primary"
        value={sequenceRule.id}
        onChange={handleChange}
        className="flex-1 pr-6"
      >
        {getAllRules().map((rule) => (
          <option
            key={rule.id}
            value={rule.id}
          >
            {rule.name}
          </option>
        ))}
      </Select>
    </div>
  );
}

export { SequenceSelector };
