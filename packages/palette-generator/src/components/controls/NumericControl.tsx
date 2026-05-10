import { Input } from "@repo/ui";

type NumericControlProps = {
  label: string;
  value: number;
  onChange: (n: number) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
};

function NumericControl({ label, value, onChange, min, max, step = 1, className }: NumericControlProps) {
  return (
    <Input
      label={label}
      className={className}
      type="number"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(Number(e.target.value) || 0)}
    />
  );
}

export { NumericControl };
