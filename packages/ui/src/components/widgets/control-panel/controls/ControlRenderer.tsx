import type { Control } from '../types';
import { ButtonControl } from './Button';
import { ColorControl } from './Color';
import { ColorPaletteControl } from './ColorPalette';
import { NumberControl } from './Number';
import { SelectControl } from './Select';
import { SliderControl } from './Slider';
import { TextControl } from './Text';
import { ToggleControl } from './Toggle';
import { VecControl } from './Vec';

export function ControlRenderer({ control }: { control: Control }) {
  if (control.hidden) return null;

  switch (control.type) {
    case 'color-palette':
      return <ColorPaletteControl control={control} />;
    case 'slider':
      return <SliderControl control={control} />;
    case 'color':
      return <ColorControl control={control} />;
    case 'toggle':
      return <ToggleControl control={control} />;
    case 'select':
      return <SelectControl control={control} />;
    case 'number':
      return <NumberControl control={control} />;
    case 'vec2':
    case 'vec3':
      return <VecControl control={control} />;
    case 'button':
      return <ButtonControl control={control} />;
    case 'text':
      return <TextControl control={control} />;
    default:
      console.warn(`[ControlRenderer] Unknown control type: ${String(control)}`);
      return null;
  }
}
