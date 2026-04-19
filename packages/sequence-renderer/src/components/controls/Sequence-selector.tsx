import { Select, Label } from "@repo/ui";
import { SEQUENCE_GENERATORS, type SequenceType } from "../generators/index.js";
import { useSequenceContext } from "../Sequence-context.js";

function SequenceSelector() {
  const { sequenceType, setSequenceType } = useSequenceContext();

  return (
    <Label className="flex gap-2 items-center">
      Sequence:
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
    </Label>
  );
}

export { SequenceSelector };
