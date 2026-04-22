import { Select } from "@repo/ui";
import { sequencesRule } from "../../core/rules.js";
import type { SequenceRule } from "../../core/rules.js";
import { useSequenceStore, setSequenceRule } from "../../store/useSequenceStore.js";

function SequenceSelector() {
  const { sequenceRule } = useSequenceStore();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRule = sequencesRule.find((rule) => rule.id === e.target.value);
    if (selectedRule) setSequenceRule(selectedRule);
  };

  return (
    <div className="flex min-w-[200px] items-center gap-2 whitespace-nowrap">
      <span className="text-sm font-medium">Sequence:</span>
      <Select
        variant="default"
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
