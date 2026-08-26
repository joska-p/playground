import { FieldRow, Button, Select } from '@repo/tlc/components/forms';
import { PanelSection } from '@repo/tlc/layout';

import { RENDER_MODE_OPTIONS } from '../lib/renderModes';
import {
    setRenderMode,
    setResolution,
    useRenderMode,
    useResolution
} from '../store';

export function RenderSection() {
    const resolution = useResolution();
    const renderMode = useRenderMode();

    return (
        <PanelSection
            label="render"
            defaultOpen
        >
            <FieldRow label="Renderer">
                <div className="flex gap-1">
                    {RENDER_MODE_OPTIONS.map((option) => (
                        <Button
                            key={option.value}
                            variant={renderMode === option.value ? 'primary' : 'secondary'}
                            size="sm"
                            onClick={() => {
                                setRenderMode(option.value);
                            }}
                            className="px-2 py-1 text-xs"
                        >
                            {option.label}
                        </Button>
                    ))}
                </div>
            </FieldRow>

            <FieldRow label={`Resolution${renderMode === 'gpu' ? ' (CPU only)' : ''}`}>
                <Select
                    value={String(resolution)}
                    disabled={renderMode === 'gpu'}
                    onChange={(val) => {
                        setResolution(Number(val));
                    }}
                    options={[
                        { label: '48', value: '48' },
                        { label: '64', value: '64' },
                        { label: '96', value: '96' },
                        { label: '128', value: '128' },
                        { label: '256', value: '256' }
                    ]}
                />
            </FieldRow>
        </PanelSection>
    );
}
