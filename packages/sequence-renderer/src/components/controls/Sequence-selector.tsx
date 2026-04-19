import { Label } from "@repo/ui";
import { SEQUENCE_GENERATORS, type SequenceType } from "../generators/index.js";
import { useSequenceContext } from "../Sequence-context.js";

function SequenceSelector() {
  const { sequenceType, setSequenceType } = useSequenceContext();

  return (
    <Label className="flex items-center gap-2 whitespace-nowrap">
      <span className="text-sm font-medium">Sequence:</span>
      <select
        value={sequenceType}
        onChange={(e) => setSequenceType(e.target.value as SequenceType)}
        className="bg-background text-foreground border rounded px-2 py-1 text-sm"
      >
        {Object.entries(SEQUENCE_GENERATORS).map(([key, gen]) => (
          <option key={key} value={key}>
            {gen.name}
          </option>
        ))}
      </select>
    </Label>
  );
}

export { SequenceSelector };
