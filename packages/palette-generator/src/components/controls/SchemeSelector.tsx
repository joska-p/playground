import type { SchemeType } from "../../core/paletteGenerators.js";
import { Button } from "@repo/ui";
import { SCHEME_LABELS } from "../../core/paletteGenerators.js";

type SchemeSelectorProps = {
  value: SchemeType;
  onChange: (s: SchemeType) => void;
};

function SchemeSelector({ value, onChange }: SchemeSelectorProps) {
  const schemes = Object.keys(SCHEME_LABELS) as SchemeType[];

  return (
    <div className="flex flex-wrap gap-2">
      {schemes.map((s) => (
        <Button
          key={s}
          variant={value === s ? "primary" : "outline"}
          size="small"
          onClick={() => onChange(s)}
        >
          {SCHEME_LABELS[s]}
        </Button>
      ))}
    </div>
  );
}

export { SchemeSelector };
