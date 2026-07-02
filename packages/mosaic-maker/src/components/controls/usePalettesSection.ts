import type { Control, ControlSection } from '@repo/ui/ControlPanel/types';
import { applyPalette } from '../../stores/mosaic/actions';
import { useCurrentPalette, useCurrentPalettes } from '../../stores/mosaic/selectors';

function usePalettesSection() {
  const currentPalettes = useCurrentPalettes();
  const currentPalette = useCurrentPalette();

  const paletteControls: Control[] = currentPalettes.map((palette) => {
    const colors = [
      palette['--color-0'],
      palette['--color-1'],
      palette['--color-2'],
      palette['--color-3'],
      palette['--color-4']
    ];

    return {
      id: palette.id,
      type: 'color-palette',
      label: palette.id,
      value: palette.id,
      name: 'mosaic-palette',
      colors,
      checked: palette.id === currentPalette.id,
      orientation: 'vertical',
      size: 'small',
      onChange: (id: string) => {
        const selected = currentPalettes.find((p) => p.id === id);
        if (selected) applyPalette(selected);
      }
    } satisfies Control;
  });

  const palettesSection: ControlSection = {
    id: 'palettes',
    label: 'Palettes',
    controls: paletteControls,
    flow: 'horizontal'
  };

  return palettesSection;
}

export { usePalettesSection };
