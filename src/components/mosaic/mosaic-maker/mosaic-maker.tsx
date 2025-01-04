import { useRef, useState } from "react";
import { SidebarProvider } from "@components/widgets/sidebar/sidebar";
import { Mosaic } from "./mosaic";
import { Controls } from "./controls/controls";

const MosaicMaker = () => {
  const [tiles, setTiles] = useState<string[]>([]);
  const mosaicRef = useRef<HTMLDivElement>(null);

  return (
    <SidebarProvider desktopPosition="right" mobilePosition="bottom">
      <SidebarProvider.Content className="relative">
        <Mosaic mosaicRef={mosaicRef} tiles={tiles} />
      </SidebarProvider.Content>

      <SidebarProvider.Sidebar className="bg-card">
        <Controls mosaicRef={mosaicRef} setTiles={setTiles} />
      </SidebarProvider.Sidebar>
    </SidebarProvider>
  );
};

export { MosaicMaker };
