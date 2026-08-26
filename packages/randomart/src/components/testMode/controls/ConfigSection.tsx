import { FieldRow, Select, Slider } from '@repo/tlc/components/forms';
import { PanelSection } from '@repo/tlc/layout';

import { setArgPreset, setGlobalT, useArgPreset, useGlobalT } from '../store';

import type { ArgPreset } from '../store';

const PRESET_OPTIONS: { value: ArgPreset; label: string }[] = [
    { value: 'gradient', label: 'Gradient (x, y, t)' },
    { value: 'symmetric', label: 'Symmetric (x, x*y, t)' },
    { value: 'interactive', label: 'Interactive (x, t, 0)' }
];

export function ConfigSection() {
    const globalT = useGlobalT();
    const argPreset = useArgPreset();

    return (
        <PanelSection
            label="config"
            defaultOpen
        >
            <FieldRow
                label="Global Constant (t)"
                value={<span className="font-mono text-xs">{globalT.toFixed(2)}</span>}
            >
                <Slider
                    min={-1}
                    max={1}
                    step={0.01}
                    value={globalT}
                    onChange={setGlobalT}
                />
            </FieldRow>

            <FieldRow label="Arg Preset">
                <Select
                    value={argPreset}
                    onChange={(val) => {
                        setArgPreset(val as ArgPreset);
                    }}
                    options={PRESET_OPTIONS.map((opt) => ({ label: opt.label, value: opt.value }))}
                />
            </FieldRow>
        </PanelSection>
    );
}
