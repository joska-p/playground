import {
  getColorProperties,
  getRandomColorsToUse,
  getRandomPalette,
} from "@/components/mosaic/lib/colors";
import { getRandom, shuffleObject } from "@lib/utils";
import { Sidebar, SidebarContent, SidebarProvider } from "@ui/sidebar";
import { useEffect, useMemo, useRef, useState } from "react";
import Controls from "./controls/Controls";
import Tile from "./tiles/Tile";
import { defaultTileSet } from "./tiles/default-tile-set";

export type DefaultTileSet = typeof defaultTileSet;

const Mosaic = ({ tileWidth = 64, tileHeight = 64, initialTileSet = defaultTileSet }) => {
  const [mosaicTileSize, setMosaicTileSize] = useState({ width: tileWidth, height: tileHeight });
  const [mosaicTileSet, setMosaicTileSet] = useState(initialTileSet);
  const [colorProperties, setColorProperties] = useState(getColorProperties());
  const [mosaicTiles, setMosaicTiles] = useState<DefaultTileSet>([]);
  const [mosaicGap, setMosaicGap] = useState(0);
  const mosaicRef = useRef<HTMLDivElement>(null);

  const styleObject = useMemo(
    () =>
      ({
        ...colorProperties,
        "--tile-width": `${mosaicTileSize.width}px`,
        "--tile-height": `${mosaicTileSize.height}px`,
        "--gap": `${mosaicGap}px`,
      }) as React.CSSProperties,
    [colorProperties, mosaicGap, mosaicTileSize]
  );

  const setNewColors = async () => {
    const newPalette = await getRandomPalette();
    const newColorProperties = getColorProperties(newPalette);
    setColorProperties(newColorProperties);
  };

  const swapColors = () => {
    const newColorProperties = shuffleObject(colorProperties);
    Object.entries(newColorProperties).forEach(([key, value]) => {
      mosaicRef.current?.style.setProperty(key, value);
    });
  };

  const setNewTiles = (newMosaicTileSet = mosaicTileSet) => {
    if (!mosaicRef.current) return;

    const numberOfColumns = Math.floor(
      mosaicRef.current.offsetWidth / (mosaicTileSize.width + mosaicGap)
    );
    const numberOfRows = Math.floor(
      mosaicRef.current.offsetHeight / (mosaicTileSize.height + mosaicGap)
    );

    const newNumberOfTiles = numberOfColumns * numberOfRows;
    const newTiles = Array.from({ length: newNumberOfTiles }, () => {
      return getRandom(newMosaicTileSet);
    });
    setMosaicTiles(newTiles);
  };

  useEffect(setNewTiles, []);

  return (
    <SidebarProvider className="h-full">
      <SidebarContent className="relative h-full">
        <div
          className="absolute inset-0 flex h-full flex-wrap place-content-center gap-[var(--gap)] overflow-hidden"
          ref={mosaicRef}
          style={styleObject}
        >
          {mosaicTiles.map((tile, index) => (
            <Tile
              key={index}
              name={tile}
              colors={getRandomColorsToUse()}
              rotation={getRandom([0, 90, 180, 270])}
            />
          ))}
        </div>
      </SidebarContent>

      <Sidebar position="right">
        <Controls
          mosaicTileSet={mosaicTileSet}
          setMosaicTileSet={setMosaicTileSet}
          mosaicGap={mosaicGap}
          setMosaicGap={setMosaicGap}
          mosaicTileSize={mosaicTileSize}
          setMosaicTileSize={setMosaicTileSize}
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
