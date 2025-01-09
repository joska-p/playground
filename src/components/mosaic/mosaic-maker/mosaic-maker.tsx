import { SidebarProvider } from "@/components/widgets/sidebar/sidebar";
import { getRandom } from "@/lib/utils";
import { computed, signal } from "@preact/signals-react";
import { StrictMode, useRef } from "react";
import { initialPalette, initialTileSet, MAX_RANDOM_PALETTES } from "./config";
import { Controls } from "./controls/controls";
import { fetchPalettes } from "./libs/fetch-palettes";
import { computeNumberOfTiles } from "./libs/style-utils";
import { Mosaic } from "./mosaic";

const mosaicRef = signal<React.RefObject<HTMLDivElement | null>>({ current: null });
const tileSet = signal(initialTileSet);
const allThePalettes = signal(await fetchPalettes());
const currentPalettes = signal(allThePalettes.value.slice(0, MAX_RANDOM_PALETTES));
const currentPalette = signal(initialPalette);
const tiles = computed(() => {
  const newTileSet = tileSet.value;
  const mosaicElement = mosaicRef.value.current;
  const numberOfTiles = mosaicElement ? computeNumberOfTiles(mosaicElement) : 0;
  return Array.from({ length: numberOfTiles }, () => getRandom(newTileSet));
});

function MosaicMaker() {
  mosaicRef.value = useRef<HTMLDivElement>(null);

  return (
    <SidebarProvider desktopPosition="right" mobilePosition="bottom">
      <SidebarProvider.Content className="relative">
        <Mosaic tiles={tiles} mosaicRef={mosaicRef} />
      </SidebarProvider.Content>

      <SidebarProvider.Sidebar className="bg-card">
        <Controls
          mosaicRef={mosaicRef}
          tileSet={tileSet}
          allThePalettes={allThePalettes}
          currentPalettes={currentPalettes}
          currentPalette={currentPalette}
        />
      </SidebarProvider.Sidebar>
    </SidebarProvider>
  );
}

function StrictModeMosaicMaker() {
  return (
    <StrictMode>
      <MosaicMaker />
    </StrictMode>
  );
}

export { MosaicMaker, StrictModeMosaicMaker };
