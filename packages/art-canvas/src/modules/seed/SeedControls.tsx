import { FieldRow, Input, Select, Slider } from '@repo/tlc/components/forms';

import {
    setComplexity,
    setMood,
    setPalette,
    setSeed,
    useComplexity,
    useMood,
    usePalette,
    useSeed
} from './store';

import type { MoodName } from '../../assembly/moods';
import type { PalettePresetName } from '../../palettes/registry';

const MOOD_OPTIONS = [
    { label: 'Organic', value: 'organic' },
    { label: 'Geometric', value: 'geometric' },
    { label: 'Calm', value: 'calm' },
    { label: 'Energetic', value: 'energetic' }
] as const;

const PALETTE_OPTIONS = [
    { label: 'Iridescent Opal', value: 'iridescent_opal' },
    { label: 'Neon Cyber', value: 'neon_cyber' },
    { label: 'Biomorphic Flesh', value: 'biomorphic_flesh' },
    { label: 'Volcanic Magma', value: 'volcanic_magma' },
    { label: 'Deep Ocean', value: 'deep_ocean' }
] as const;

function SeedControls() {
    const seed = useSeed();
    const complexity = useComplexity();
    const mood = useMood();
    const palette = usePalette();

    return (
        <>
            <FieldRow label="Seed">
                <Input
                    value={seed}
                    onChange={(e) => {
                        setSeed(e.target.value);
                    }}
                />
            </FieldRow>
            <FieldRow label="Complexity">
                <Slider
                    value={complexity}
                    onChange={setComplexity}
                    min={1}
                    max={5}
                />
            </FieldRow>
            <FieldRow label="Mood">
                <Select
                    value={mood}
                    onChange={(val) => {
                        setMood(val as MoodName);
                    }}
                    options={MOOD_OPTIONS.map((opt) => ({ label: opt.label, value: opt.value }))}
                />
            </FieldRow>
            <FieldRow label="Palette">
                <Select
                    value={palette}
                    onChange={(val) => {
                        setPalette(val as PalettePresetName);
                    }}
                    options={PALETTE_OPTIONS.map((opt) => ({ label: opt.label, value: opt.value }))}
                />
            </FieldRow>
        </>
    );
}

export { SeedControls };
