import type { Label } from './core/types';

export const CHART_SAMPLE_LIMIT = 100;

export const labelToColorMap: Record<Label, string> = {
    car: 'var(--color-red)',
    fish: 'var(--color-blue)',
    house: 'var(--color-primary)',
    tree: 'var(--color-green)',
    bicycle: 'var(--color-yellow)',
    guitar: 'var(--color-purple)',
    pencil: 'var(--color-aqua)',
    clock: 'var(--color-orange)'
};
