import { ControlPanel } from '@repo/ui/ControlPanel';
import type { ControlSection } from '@repo/ui/ControlPanel/types';
import { useIsPalettesLoading } from '../../stores/mosaic/selectors';
import { TileSetControls } from './TileSetControls';
import { useActionsSection } from './useActionsSection';
import { useLayoutSection } from './useLayoutSection';
import { usePalettesSection } from './usePalettesSection';

function MosaicControlsPanel() {
  const isPalettesLoading = useIsPalettesLoading();

  const actionsSection = useActionsSection();
  const layoutSection = useLayoutSection();
  const palettesSection = usePalettesSection();

  const sections: ControlSection[] = [actionsSection, layoutSection, palettesSection];

  return (
    <ControlPanel
      className="bg-background/95 text-foreground"
      header={<TileSetControls />}
      sections={sections}
      accordion={false}
      footer={
        isPalettesLoading ? (
          <div className="border-border/30 text-foreground/60 grid grid-flow-col place-content-center gap-2 border-t px-4 py-3 text-sm">
            <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
            Loading palettes...
          </div>
        ) : undefined
      }
    />
  );
}

export { MosaicControlsPanel };
