import type { Control, ControlSection } from '@repo/ui/ControlPanel';
import { initialRotations } from '../../core/constants';
import { cyclePalettes, regenerateTiles } from '../../stores/mosaic/actions';
import {
  useCurrentPalette,
  useIsPalettesLoading,
  useMosaicRef
} from '../../stores/mosaic/selectors';
import { shuffleObject } from '../../utils/random/shuffleObject';
import { updateElementStyles } from '../../utils/updateElementStyles';

function useActionsSection() {
  const mosaicRef = useMosaicRef();
  const currentPalette = useCurrentPalette();
  const isPalettesLoading = useIsPalettesLoading();

  function shuffleColors() {
    if (!mosaicRef.current) return;
    updateElementStyles(mosaicRef.current, shuffleObject(currentPalette));
  }

  function shuffleRotations() {
    if (!mosaicRef.current) return;
    updateElementStyles(mosaicRef.current, shuffleObject(initialRotations));
  }

  const actionsSection: ControlSection = {
    id: 'actions',
    label: 'Actions',
    defaultOpen: true,
    controls: [
      {
        id: 'shuffle-colors',
        type: 'button',
        label: 'Shuffle Colors',
        variant: 'primary',
        onClick: shuffleColors
      } satisfies Control,
      {
        id: 'shuffle-rotations',
        type: 'button',
        label: 'Shuffle Rotations',
        onClick: shuffleRotations
      } satisfies Control,
      {
        id: 'cycle-palettes',
        type: 'button',
        label: 'Cycle Palettes',
        disabled: isPalettesLoading,
        onClick: cyclePalettes
      } satisfies Control,
      {
        id: 'regenerate-tiles',
        type: 'button',
        label: 'Regenerate Tiles',
        onClick: regenerateTiles
      } satisfies Control
    ]
  };

  return actionsSection;
}

export { useActionsSection };
