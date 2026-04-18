import type { ComponentProps } from "react";
import type { TileSet, Palette, TileNames } from "./config.js";
interface MosaicContext {
    mosaicRef: React.RefObject<HTMLDivElement | null>;
    currentPalettes: Palette[];
    updateCurrentPalettes: () => void;
    currentPalette: Palette;
    updatePalette: (palette: Palette) => void;
    tileSet: TileSet;
    updateTileSet: (tileName: TileNames) => void;
    tiles: TileSet;
    updateTiles: (tileSet?: TileSet) => void;
}
declare function MosaicMakerProvider({ children }: ComponentProps<"div">): import("react/jsx-runtime").JSX.Element;
declare function useMosaicMakerContext(): MosaicContext;
export { MosaicMakerProvider, useMosaicMakerContext };
//# sourceMappingURL=Mosaic-context.d.ts.map