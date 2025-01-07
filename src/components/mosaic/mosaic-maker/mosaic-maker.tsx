import { StrictMode, useCallback, useEffect, useRef, useState } from "react";
import { SidebarProvider } from "@components/widgets/sidebar/sidebar";
import { Mosaic } from "./mosaic";
import { Controls } from "./controls/controls";
import { computeNumberOfTiles } from "./libs/style-utils";
import { getRandom } from "@/lib/utils";
import { initialTileSet } from "./config";

const MosaicMaker = () => {
  const [tiles, setTiles] = useState<string[]>([]);
  const mosaicRef = useRef<HTMLDivElement>(null);

  const setNewTiles = useCallback((tileSet = initialTileSet) => {
    if (!mosaicRef.current) return;
    const numberOfTiles = computeNumberOfTiles(mosaicRef.current);
    const newTiles = Array.from({ length: numberOfTiles }, () => getRandom(tileSet));
    setTiles(newTiles);
  }, []);

  useEffect(() => {
    setNewTiles();
  }, [setNewTiles]);

  return (
    <SidebarProvider desktopPosition="right" mobilePosition="bottom">
      <SidebarProvider.Content className="relative">
        <Mosaic mosaicRef={mosaicRef} tiles={tiles} />
      </SidebarProvider.Content>

      <SidebarProvider.Sidebar className="bg-card">
        <Controls mosaicRef={mosaicRef} setNewTiles={setNewTiles} />
      </SidebarProvider.Sidebar>
    </SidebarProvider>
  );
};

const StrictModeMosaicMaker = () => {
  return (
    <StrictMode>
      <MosaicMaker />
    </StrictMode>
  );
};

export { MosaicMaker, StrictModeMosaicMaker };
