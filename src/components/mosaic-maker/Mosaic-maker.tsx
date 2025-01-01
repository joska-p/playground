import { useCallback, useRef, useState } from "react";
import { computeNumberOfTiles } from "@/components/mosaic-maker/lib/utils";
import { Mosaic } from "@/components/mosaic-maker/mosaic";
import { SidebarProvider } from "@/components/widgets/sidebar/Sidebar";
import { getRandom } from "@lib/utils";
import { Controls } from "./controls/Controls";
import { defaultTileSet } from "./tiles/default-options";

const MosaicMaker = () => {
  const [mosaicTiles, setMosaicTiles] = useState(defaultTileSet);
  const mosaicRef = useRef<HTMLDivElement>(null);

  const handleSetNewTiles = useCallback((tileSet = defaultTileSet) => {
    if (mosaicRef.current) {
      const computedNumberOfTiles = computeNumberOfTiles(mosaicRef.current);
      const newTiles = Array.from({ length: computedNumberOfTiles }, () => getRandom(tileSet));
      setMosaicTiles(newTiles);
    }
  }, []);

  return (
    <SidebarProvider desktopPosition="right" mobilePosition="bottom">
      <SidebarProvider.Content className="relative bg-popover">
        <Mosaic mosaicRef={mosaicRef} mosaicTiles={mosaicTiles} />
      </SidebarProvider.Content>

      <SidebarProvider.Sidebar className="bg-card">
        <Controls mosaicRef={mosaicRef} handleSetNewTiles={handleSetNewTiles} />
      </SidebarProvider.Sidebar>
    </SidebarProvider>
  );
};

export { MosaicMaker };
