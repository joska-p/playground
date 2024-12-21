import { initialColors } from "@/components/mosaic/lib/colors";
import { getRandom } from "@lib/utils";
import { Sidebar, SidebarContent, SidebarProvider } from "@ui/sidebar";
import { useEffect, useRef, useState } from "react";
import Controls from "./controls/Controls";
import Tile from "./tiles/Tile";
import { defaultTileSet } from "./tiles/default-tile-set";

export type DefaultTileSet = typeof defaultTileSet;

const Mosaic = ({ tileWidth = 64, tileHeight = 64, tileSet = defaultTileSet }) => {
  const [mosaicTileSet, setMosaicTileSet] = useState(tileSet);
  const [mosaicTiles, setMosaicTiles] = useState<DefaultTileSet>([]);
  const mosaicRef = useRef<HTMLDivElement>(null);

  const computedTileWidth = () => {
    if (!mosaicRef.current) return tileWidth;
    return parseFloat(
      getComputedStyle(mosaicRef.current as HTMLDivElement).getPropertyValue("--tile-width")
    );
  };

  const computedTileHeight = () => {
    if (!mosaicRef.current) return tileHeight;
    return parseFloat(
      getComputedStyle(mosaicRef.current as HTMLDivElement).getPropertyValue("--tile-height")
    );
  };

  const computedGap = () => {
    if (!mosaicRef.current) return 0;
    return parseFloat(
      getComputedStyle(mosaicRef.current as HTMLDivElement).getPropertyValue("--mosaicGap")
    );
  };

  const computedNumberOfTiles = () => {
    if (!mosaicRef.current) return 0;
    return (
      Math.floor(
        mosaicRef.current.parentElement!.offsetWidth / (computedTileWidth() + computedGap())
      ) *
      Math.floor(
        mosaicRef.current.parentElement!.offsetHeight / (computedTileHeight() + computedGap())
      )
    );
  };

  const setNewTiles = (newMosaicTileSet = mosaicTileSet) => {
    const newTiles = Array.from({ length: computedNumberOfTiles() }, () =>
      getRandom(newMosaicTileSet)
    );
    setMosaicTiles(newTiles);
  };

  const styleObject = {
    ...initialColors,
    "--tile-width": `${tileWidth}px`,
    "--tile-height": `${tileHeight}px`,
    "--mosaicGap": `${0}px`,
  } as React.CSSProperties;

  useEffect(() => {
    setNewTiles();
  }, []);

  return (
    <SidebarProvider className="h-full">
      <SidebarContent className="absolute inset-0 content-center overflow-hidden">
        <div
          className="mx-auto flex w-fit flex-wrap justify-center gap-[var(--mosaicGap)]"
          ref={mosaicRef}
          style={styleObject}
        >
          {mosaicTiles.map((tile, index) => (
            <Tile
              key={index}
              name={tile}
              colors={Object.keys(initialColors).map(() => getRandom(Object.keys(initialColors)))}
              rotation={getRandom([0, 90, 180, 270])}
            />
          ))}
        </div>
      </SidebarContent>

      <Sidebar position="right">
        <Controls
          mosaicRef={mosaicRef}
          mosaicTileSet={mosaicTileSet}
          setMosaicTileSet={setMosaicTileSet}
          initialTileSet={tileSet}
          setNewTiles={setNewTiles}
        />
      </Sidebar>
    </SidebarProvider>
  );
};

export default Mosaic;
