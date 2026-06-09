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
  Cube: 'Cube',
};

function TileSetControls() {
  const tileSet = useTileSet();

  return (
    <div>
      <h3 className="text-foreground/60 mb-2 text-xs font-medium">
        Tile types
      </h3>
      <div
        className="flex flex-wrap items-center justify-center gap-4 [--rotation:0deg] [--tile-size:32px]"
        style={{ ...initialPalette } as React.CSSProperties}
      >
        {initialTileSet.map((tileName) => {
          return (
            <label
              key={tileName}
              aria-label={tileName}
              className="flex cursor-pointer flex-col items-center gap-1"
            >
              <input
                type="checkbox"
                checked={tileSet.includes(tileName)}
                onChange={() => toggleTileInSet(tileName)}
                className="peer sr-only"
              />
              <Tile
                name={tileName}
                colors={[
                  '--color-0',
                  '--color-1',
                  '--color-2',
                  '--color-3',
                  '--color-4',
                ]}
                className={cn(
                  'opacity-70 transition-opacity',
                  'peer-checked:ring-primary peer-checked:opacity-100 peer-checked:ring-4',
                  'peer-focus-visible:ring-accent peer-focus-visible:ring-4'
                )}
                rotation="--rotation-0"
              />
              <span className="text-foreground/50 text-[10px]">
                {displayNames[tileName]}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

export { TileSetControls };
