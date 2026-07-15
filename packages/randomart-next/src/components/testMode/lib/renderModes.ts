import type { RenderMode } from '../store';

export const RENDER_MODE_OPTIONS: { value: RenderMode; label: string }[] = [
  { value: 'cpu', label: 'CPU' },
  { value: 'gpu', label: 'GPU' },
  { value: 'compare', label: 'Compare' }
];
