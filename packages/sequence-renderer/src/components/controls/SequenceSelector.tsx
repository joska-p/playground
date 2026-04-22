import { Select } from "@repo/ui";
import { useSequenceContext } from "../../context/sequenceContext.js";
import { sequencesRule } from "../../core/rules.js";
import type { SequenceRule } from "../../core/rules.js";

function SequenceSelector() {
  const { sequenceRule, setSequenceRule } = useSequenceContext();
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    const selectedRule = sequencesRule.find((rule) => rule.id === e.target.value);
    if (selectedRule) setSequenceRule(selectedRule);
  };

  return (
    <div className="flex items-center gap-2 whitespace-nowrap min-w-[200px]">
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
