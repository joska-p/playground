import { getRandom } from "@/lib/utils";
import { Tile } from "./tiles/tile";
import { initialPalette, initialRotations } from "./options";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  mosaicRef: React.RefObject<HTMLDivElement>;
  tiles: string[];
};

const Mosaic = ({ mosaicRef, tiles }: Props) => {
  return (
    <div
      ref={mosaicRef}
      className="absolute inset-0 grid grid-cols-[repeat(auto-fill,var(--tile-width))] grid-rows-[repeat(auto-fill,var(--tile-height),1fr)] content-start justify-center gap-[var(--mosaicGap)] overflow-hidden [--mosaicGap:0px] [--tile-height:64px] [--tile-width:64px]"
      style={{ ...initialPalette, ...initialRotations } as React.CSSProperties}
    >
      {tiles.map((tile, index) => (
        <Tile
          // biome-ignore lint/suspicious/noArrayIndexKey: There is no other way
          key={index}
          name={tile}
          colors={Object.keys(initialPalette).map(() => getRandom(Object.keys(initialPalette)))}
          rotation={getRandom(Object.keys(initialRotations))}
        />
      ))}
    </div>
  );
};

export { Mosaic };
