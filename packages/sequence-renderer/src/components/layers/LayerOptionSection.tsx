import { FieldRow, Checkbox, Input, Slider } from '@repo/tlc/components/forms';

import type { ParamDescriptor } from '../../core/types';

type Params = Record<string, ParamDescriptor>;

interface LayerOptionSectionProps {
    params: Params;
    values: Record<string, unknown>;
    onChange: (key: string, value: unknown) => void;
}

function LayerOptionSection({ params, values, onChange }: LayerOptionSectionProps) {
    return (
        <>
            {Object.entries(params).map(([key, descriptor]) => {
                const currentValue = values[key] ?? descriptor.default;

                return (
                    <FieldRow
                        key={key}
                        label={descriptor.label}
                    >
                        {descriptor.type === 'number' && (
                            <Slider
                                value={Number(currentValue)}
                                onChange={(value) => {
                                    onChange(key, value);
                                }}
                                min={descriptor.min}
                                max={descriptor.max}
                                step={descriptor.step}
                            />
                        )}
                        {descriptor.type === 'color' && (
                            <Input
                                type="color"
                                value={(currentValue as string) || '#ffffff'}
                                onChange={(e) => {
                                    onChange(key, e.target.value);
                                }}
                            />
                        )}
                        {descriptor.type === 'string' && (
                            <Input
                                type="text"
                                value={currentValue as string}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    onChange(key, e.target.value);
                                }}
                            />
                        )}
                        {descriptor.type === 'boolean' && (
                            <Checkbox
                                checked={currentValue as boolean}
                                onChange={(checked) => {
                                    onChange(key, checked);
                                }}
                            />
                        )}
                    </FieldRow>
                );
            })}
        </>
    );
}

export { LayerOptionSection };
