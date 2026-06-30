import { cn } from '@repo/ui/cn';
import { initialPalette } from '../../core/initialPalette';
import { initialTileSet } from '../../core/initialTileSet';
import { toggleTileInSet } from '../../stores/mosaic/actions';
import { useTileSet } from '../../stores/mosaic/selectors';
import { Tile } from '../Tile';

const displayNames: Record<string, string> = {
  CornerCircles: 'Corner',
  Diamond: 'Diamond',
  MiddleCircle: 'Middle',
  OppositeCircles: 'Opposite',
  Rainbow: 'Rainbow',
  Square: 'Square',
  Triangles: 'Triangles',
  Cube: 'Cube'
};

function TileSetControls() {
  const tileSet = useTileSet();

  return (
    <>
      <h3 className="sr-only">Tile types</h3>
      <div
        className="grid grid-cols-4 items-center justify-center gap-4 px-2 py-4 [--tile-size:32px]"
        style={{ ...initialPalette } as React.CSSProperties}
      >
        {initialTileSet.map((tileName) => {
          return (
            <label
              key={tileName}
              aria-label={tileName}
              className="grid cursor-pointer justify-items-center gap-2"
            >
              <input
                type="checkbox"
                checked={tileSet.includes(tileName)}
                onChange={() => toggleTileInSet(tileName)}
                className="peer sr-only"
              />
              <Tile
                name={tileName}
                colors={['--color-0', '--color-1', '--color-2', '--color-3', '--color-4']}
                className={cn(
                  'opacity-70 transition-opacity',
                  'peer-checked:ring-primary peer-checked:opacity-100 peer-checked:ring-4',
                  'peer-focus-visible:ring-accent peer-focus-visible:ring-4'
                )}
                rotation="--rotation-0"
              />
              <span className="text-foreground hidden text-xs sm:inline">
                {displayNames[tileName]}
              </span>
            </label>
          );
        })}
      </div>
    </>
  );
}

export { TileSetControls };
