import { useResizeObserver } from '@repo/ui/useResizeObserver';
import { useEffect } from 'react';
import {
  CSS_VARS,
  initialGapSize,
  initialRotations,
  initialTileSize
} from '../core/constants';
import { initialPalette } from '../core/initialPalette';
import { initPalettes, setRef } from '../stores/mosaic/actions';
import { useTiles } from '../stores/mosaic/selectors';
import { Tile } from './Tile';

const MOSAIC_STYLES = {
  ...initialPalette,
  ...initialTileSize,
  ...initialGapSize,
  ...initialRotations,
  gridTemplateColumns: `repeat(auto-fit,var(${CSS_VARS.size}))`,
  gridTemplateRows: `repeat(auto-fit,var(${CSS_VARS.size}))`,
  gap: `var(${CSS_VARS.gap})`
} as React.CSSProperties;

function MosaicDisplay() {
  const tiles = useTiles();
  const [mosaicRef, dimensions] = useResizeObserver<HTMLDivElement>();
  const { width, height } = dimensions;

  useEffect(() => {
    if (!width || !height || width <= 0 || height <= 0) return;

    const id = setTimeout(() => {
      setRef(mosaicRef);
    }, 150);
    return () => clearTimeout(id);
  }, [width, height, mosaicRef]);

  useEffect(() => {
    initPalettes();
  }, []);

  return (
    <div
      ref={mosaicRef}
      className="grid min-h-full content-center justify-center overflow-hidden"
      style={MOSAIC_STYLES}
    >
      {tiles.map((tile) => (
        <Tile
          key={tile.id}
          name={tile.name}
          colors={tile.colors}
          rotation={tile.rotation}
        />
      ))}
    </div>
  );
}

export { MosaicDisplay };
