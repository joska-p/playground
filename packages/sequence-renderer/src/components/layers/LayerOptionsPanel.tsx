import { Input } from '@repo/ui/Input';
import { Label } from '@repo/ui/Label';
import { Slider } from '@repo/ui/Slider';
import type { ParamDescriptor } from '../../core/types';

type Params = Record<string, ParamDescriptor>;

type LayerOptionsPanelProps = {
  params: Params;
  values: Record<string, unknown>;
  onChange: (key: string, value: unknown) => void;
};

function LayerOptionsPanel({ params, values, onChange }: LayerOptionsPanelProps) {
  return (
    <div className="border-border mt-2 flex flex-col gap-2 border-t pt-2">
      {Object.entries(params).map(([key, descriptor]) => {
        const currentValue = values[key] ?? descriptor.default;

        return (
          <div
            key={key}
            className="flex items-center gap-3"
          >
            <Label className="text-muted-foreground w-24 shrink-0 truncate text-xs">
              {descriptor.label}
            </Label>

            {descriptor.type === 'number' && (
              <Slider
                variant="secondary"
                value={currentValue as number}
                onChange={(value) => onChange(key, value)}
                min={descriptor.min}
                max={descriptor.max}
                step={descriptor.step}
                className="flex-1"
              />
            )}

            {descriptor.type === 'color' && (
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={(currentValue as string) || '#ffffff'}
                  onChange={(e) => onChange(key, e.target.value)}
                  className="border-border h-6 w-8 cursor-pointer rounded border bg-transparent"
                />
                <span className="text-muted-foreground font-mono text-xs">
                  {(currentValue as string) || 'inherit'}
                </span>
              </div>
            )}

            {descriptor.type === 'string' && (
              <Input
                type="text"
                value={currentValue as string}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(key, e.target.value)}
                className="border-border h-6 w-full cursor-pointer rounded border bg-transparent"
              />
            )}

            {descriptor.type === 'boolean' && (
              <input
                type="checkbox"
                checked={currentValue as boolean}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onChange(key, e.target.checked)
                }
                className="border-border h-6 cursor-pointer rounded border bg-transparent"
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export { LayerOptionsPanel };
