import { Select } from "@repo/ui";
import { SEQUENCE_GENERATORS, type SequenceType } from "../generators/index.js";
import { useSequenceContext } from "../Sequence-context.js";

function SequenceSelector() {
  const { sequenceType, setSequenceType } = useSequenceContext();

  return (
    <div className="flex items-center gap-2 whitespace-nowrap min-w-[200px]">
      <span className="text-sm font-medium">Sequence:</span>
      <Select
        variant="secondary"
        value={sequenceType}
        onChange={(e) => setSequenceType(e.target.value as SequenceType)}
        className="flex-1"
      >
        {Object.entries(SEQUENCE_GENERATORS).map(([key, gen]) => (
          <option key={key} value={key}>
            {gen.name}
          </option>
        ))}
      </Select>
    </div>
  );
}

export { SequenceSelector };
