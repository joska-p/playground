import { Select } from "@repo/ui/Select";
import type { SequenceRule } from "../../core/sequencesRule";
import { sequencesRule } from "../../core/sequencesRule";
import { useSequenceRule as _useSequenceRule, setSequenceRule } from "../../store/sequenceStore";

function SequenceSelector() {
  const sequenceRule = _useSequenceRule();

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const selectedRule = sequencesRule.find((rule: SequenceRule) => rule.id === e.target.value);
    if (selectedRule) setSequenceRule(selectedRule);
  }

  return (
    <div className="flex min-w-[200px] items-center gap-2 whitespace-nowrap">
      <span className="text-sm font-medium">Sequence:</span>
      <Select
        variant="primary"
        value={sequenceRule.id}
        onChange={handleChange}
        className="flex-1 pr-6"
      >
        {sequencesRule.map((sequenceRule: SequenceRule) => (
          <option key={`${sequenceRule.id}`} value={sequenceRule.id}>
            {sequenceRule.name}
          </option>
        ))}
      </Select>
    </div>
  );
}

export { SequenceSelector };
