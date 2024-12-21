import { colorNames, getRandomColors, initialColors } from "@/components/mosaic/lib/colors";
import { getRandom, shuffleObject } from "@lib/utils";
import { Sidebar, SidebarContent, SidebarProvider } from "@ui/sidebar";
import { useEffect, useRef, useState } from "react";
import Controls from "./controls/Controls";
import Tile from "./tiles/Tile";
import { defaultTileSet } from "./tiles/default-tile-set";

export type DefaultTileSet = typeof defaultTileSet;

const Mosaic = ({ tileWidth = 64, tileHeight = 64, initialTileSet = defaultTileSet }) => {
  const [mosaicTileSet, setMosaicTileSet] = useState(initialTileSet);
  const [colors, setColors] = useState(initialColors);
  const [mosaicTiles, setMosaicTiles] = useState<DefaultTileSet>([]);
  const mosaicRef = useRef<HTMLDivElement>(null);

  const computedTileWidth = () => {
    if (!mosaicRef.current) return tileWidth;
    return parseFloat(getComputedStyle(mosaicRef.current).getPropertyValue("--tile-width"));
  };

  const computedTileHeight = () => {
    if (!mosaicRef.current) return tileHeight;
    return parseFloat(getComputedStyle(mosaicRef.current).getPropertyValue("--tile-height"));
  };

  const computedGap = () => {
    if (!mosaicRef.current) return 0;
    return parseFloat(getComputedStyle(mosaicRef.current).getPropertyValue("--mosaicGap"));
  };

  const computeNumberOfTiles = () => {
    if (!mosaicRef.current) return 0;
    return (
      Math.floor(
        (mosaicRef.current.parentElement!.offsetWidth - computedGap()) /
          (computedTileWidth() + computedGap())
      ) *
      Math.floor(
        (mosaicRef.current.parentElement!.offsetHeight - computedGap()) /
          (computedTileHeight() + computedGap())
      )
    );
  };

  const setNewColors = async () => {
    const newColors = await getRandomColors();
    setColors(newColors);
  };

  const swapColors = () => {
    const newColorProperties = shuffleObject(colors);
    Object.entries(newColorProperties).forEach(([key, value]) => {
      mosaicRef.current?.style.setProperty(key, value);
    });
  };

  const setNewTiles = (newMosaicTileSet = mosaicTileSet) => {
    if (!mosaicRef.current) return;

    const newTiles = Array.from({ length: computeNumberOfTiles() }, () => {
      return getRandom(newMosaicTileSet);
    });
    setMosaicTiles(newTiles);
  };

  const styleObject = {
    ...colors,
    "--tile-width": `${tileWidth}px`,
    "--tile-height": `${tileHeight}px`,
    "--mosaicGap": `${0}px`,
  } as React.CSSProperties;

  useEffect(setNewTiles, []);

  return (
    <SidebarProvider className="h-full">
      <SidebarContent className="absolute inset-0 grid content-center overflow-hidden">
        <div
          className="mx-auto flex w-fit flex-wrap gap-[var(--mosaicGap)]"
          ref={mosaicRef}
          style={styleObject}
        >
          {mosaicTiles.map((tile, index) => (
            <Tile
              key={index}
              name={tile}
              colors={colorNames.map(() => getRandom(colorNames))}
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
          initialTileSet={initialTileSet}
          setNewColors={setNewColors}
          swapColors={swapColors}
          setNewTiles={setNewTiles}
        />
      </Sidebar>
    </SidebarProvider>
  );
};

export default Mosaic;
