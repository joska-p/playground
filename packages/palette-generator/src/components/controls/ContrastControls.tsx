import { Input, Switch } from "@repo/ui";
import { useState } from "react";

type ContrastControlsProps = {
  enabled: boolean;
  onToggle: (v: boolean) => void;
  min: number;
  onMinChange: (v: number) => void;
  against: string;
  onAgainstChange: (v: string) => void;
};

function ContrastControls({ enabled, onToggle, min, onMinChange, against, onAgainstChange }: ContrastControlsProps) {
  const [local, setLocal] = useState(min);

  function handleMinChange(v: string | number) {
    const n = typeof v === "number" ? v : Number(v);
    setLocal(Number(n) || 0);
    onMinChange(Number(n) || 0);
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <Switch checked={enabled} onCheckedChange={onToggle} label="Ensure contrast" />
        {enabled && (
          <div className="flex items-center gap-2">
            <Input
              label="Min"
              type="number"
              className="w-24"
              min={1}
              max={21}
              step={0.1}
              value={local}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleMinChange(e.target.value)}
            />
            <Input
              label="Against"
              type="text"
              className="w-28"
              value={against}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onAgainstChange(e.target.value)}
            />
            <div className="h-6 w-6 rounded border" style={{ background: against }} aria-hidden />
          </div>
        )}
      </div>
    </div>
  );
}

export { ContrastControls };
