import { colorNames, getPalettes, initialColors } from "@/components/mosaic/lib/colors";
import { getRandom, shuffleArray } from "@lib/utils";
import { Sidebar, SidebarContent, SidebarProvider } from "@ui/sidebar";
import { useEffect, useRef, useState } from "react";
import Controls from "./controls/Controls";
import Tile from "./tiles/Tile";
import { defaultTileSet } from "./tiles/default-tile-set";

export type DefaultTileSet = typeof defaultTileSet;

const Mosaic = ({ tileWidth = 64, tileHeight = 64, initialTileSet = defaultTileSet }) => {
  const [palettes, setPalettes] = useState([[""]]);
  const [mosaicTileSet, setMosaicTileSet] = useState(initialTileSet);
  const [mosaicTiles, setMosaicTiles] = useState<DefaultTileSet>([]);
  const mosaicRef = useRef<HTMLDivElement>(null);

  const computedColors = () => {
    if (!mosaicRef.current) return [];
    return colorNames.map((color) =>
      getComputedStyle(mosaicRef.current as HTMLDivElement).getPropertyValue(color)
    );
  };

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

  const setNewColors = () => {
    const randomPalette = getRandom(palettes);
    colorNames.forEach((colorName, index) => {
      if (!mosaicRef.current) return;
      mosaicRef.current.style.setProperty(colorName, randomPalette[index]);
    });
  };

  const swapColors = () => {
    const newColors = shuffleArray(computedColors());
    colorNames.forEach((colorName, index) => {
      if (!mosaicRef.current) return;
      mosaicRef.current.style.setProperty(colorName, newColors[index]);
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
    ...initialColors,
    "--tile-width": `${tileWidth}px`,
    "--tile-height": `${tileHeight}px`,
    "--mosaicGap": `${0}px`,
  } as React.CSSProperties;

  const setNewPalettes = async () => {
    const palettes = await getPalettes();
    setPalettes(palettes);
  };

  useEffect(() => {
    setNewPalettes();
    setNewTiles();
  }, []);

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
