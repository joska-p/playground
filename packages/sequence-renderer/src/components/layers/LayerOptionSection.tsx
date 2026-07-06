import { ControlRow } from '@repo/ui/control-panel';
import { Checkbox, Input, Slider } from '@repo/ui/data-entry';
import type { ParamDescriptor } from '../../core/types';

type Params = Record<string, ParamDescriptor>;

type LayerOptionSectionProps = {
  params: Params;
  values: Record<string, unknown>;
  onChange: (key: string, value: unknown) => void;
};

function LayerOptionSection({ params, values, onChange }: LayerOptionSectionProps) {
  return (
    <>
      {Object.entries(params).map(([key, descriptor]) => {
        const currentValue = values[key] ?? descriptor.default;

        return (
          <ControlRow label={descriptor.label}>
            {descriptor.type === 'number' && (
              <Slider
                variant="secondary"
                value={currentValue as number}
                onChange={(e) => {
                  onChange(key, Number(e.target.value));
                }}
                min={descriptor.min}
                max={descriptor.max}
                step={descriptor.step}
              />
            )}
            {descriptor.type === 'color' && (
              <Input
                variant="secondary"
                type="color"
                value={(currentValue as string) || '#ffffff'}
                onChange={(e) => {
                  onChange(key, e.target.value);
                }}
              />
            )}
            {descriptor.type === 'string' && (
              <Input
                variant="secondary"
                type="text"
                value={currentValue as string}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  onChange(key, e.target.value);
                }}
              />
            )}
            {descriptor.type === 'boolean' && (
              <Checkbox
                variant="secondary"
                checked={currentValue as boolean}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  onChange(key, e.target.checked);
                }}
              />
            )}
          </ControlRow>
        );
      })}
    </>
  );
}

export { LayerOptionSection };
