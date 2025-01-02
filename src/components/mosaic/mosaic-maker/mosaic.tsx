import { getRandom } from "@/lib/utils";
import { Tile } from "./tiles/tile";
import { defaultPalette, defaultRotations } from "./tiles/default-options";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  mosaicRef: React.RefObject<HTMLDivElement>;
  mosaicTiles: string[];
};

const Mosaic = ({ mosaicRef, mosaicTiles }: Props) => {
  const styleObject = {
    ...defaultPalette,
    ...defaultRotations,
    "--tile-width": "64px",
    "--tile-height": "64px",
    "--mosaicGap": "0px",
  } as React.CSSProperties;

  return (
    <div
      ref={mosaicRef}
      className="absolute inset-2 grid grid-cols-[repeat(auto-fill,var(--tile-width))] grid-rows-[repeat(auto-fill,var(--tile-height),1fr)] content-start justify-center gap-[var(--mosaicGap)] overflow-hidden"
      style={styleObject}
    >
      {mosaicTiles.map((tile, index) => (
        <Tile
          // biome-ignore lint/suspicious/noArrayIndexKey: There is no other way
          key={index}
          name={tile}
          colors={Object.keys(defaultPalette).map(() => getRandom(Object.keys(defaultPalette)))}
          rotation={getRandom(Object.keys(defaultRotations))}
        />
      ))}
    </div>
  );
};

export { Mosaic };
