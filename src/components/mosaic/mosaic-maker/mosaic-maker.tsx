import { useCallback, useRef, useState } from "react";
import { SidebarProvider } from "@/components/widgets/sidebar/sidebar";
import { getRandom } from "@lib/utils";
import { computeNumberOfTiles } from "./lib/utils";
import { Mosaic } from "./mosaic";
import { Controls } from "./controls/controls";
import { initialTileSet } from "./options";

const MosaicMaker = () => {
  const [tiles, setTiles] = useState(initialTileSet);
  const mosaicRef = useRef<HTMLDivElement>(null);

  const setNewTiles = useCallback((tileSet: string[]) => {
    if (mosaicRef.current) {
      const computedNumberOfTiles = computeNumberOfTiles(mosaicRef.current);
      const newTiles = Array.from({ length: computedNumberOfTiles }, () => getRandom(tileSet));
      setTiles(newTiles);
    }
  }, []);

  return (
    <SidebarProvider desktopPosition="right" mobilePosition="bottom">
      <SidebarProvider.Content className="relative bg-popover">
        <Mosaic mosaicRef={mosaicRef} tiles={tiles} />
      </SidebarProvider.Content>

      <SidebarProvider.Sidebar className="bg-card">
        <Controls mosaicRef={mosaicRef} setNewTiles={setNewTiles} />
      </SidebarProvider.Sidebar>
    </SidebarProvider>
  );
};

export { MosaicMaker };
