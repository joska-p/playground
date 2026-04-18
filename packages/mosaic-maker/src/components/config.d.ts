declare const CSS_VARS: {
    width: string;
    height: string;
    gap: string;
};
declare const MAX_NUMBER_OF_PALETTES = 39;
declare const DEFAULT_TILE_SIZE = 64;
declare const DEFAULT_GAP_SIZE = 0;
declare const defaultPalette: {
    readonly "--color-0": "#333333";
    readonly "--color-1": "#555555";
    readonly "--color-2": "#777777";
    readonly "--color-3": "#999999";
    readonly "--color-4": "#bbbbbb";
};
declare const defaultTileSet: readonly ["CornerCircles", "Diamond", "MiddleCircle", "OppositeCircles", "Rainbow", "Square", "Triangles", "Cube"];
export type Palette = Record<keyof typeof defaultPalette, string>;
export type TileSet = (typeof defaultTileSet)[number][];
export type TileNames = (typeof defaultTileSet)[number];
declare const initialTileSize: {
    [CSS_VARS.width]: string;
    [CSS_VARS.height]: string;
};
declare const initialGapSize: {
    [CSS_VARS.gap]: string;
};
declare const initialRotations: {
    "--rotation-0": string;
    "--rotation-1": string;
    "--rotation-2": string;
    "--rotation-3": string;
};
declare const initialPalette: {
    readonly "--color-0": "#333333";
    readonly "--color-1": "#555555";
    readonly "--color-2": "#777777";
    readonly "--color-3": "#999999";
    readonly "--color-4": "#bbbbbb";
};
declare const initialTileSet: readonly ["CornerCircles", "Diamond", "MiddleCircle", "OppositeCircles", "Rainbow", "Square", "Triangles", "Cube"];
export { CSS_VARS, DEFAULT_GAP_SIZE, DEFAULT_TILE_SIZE, initialGapSize, initialPalette, initialRotations, initialTileSet, initialTileSize, MAX_NUMBER_OF_PALETTES, };
//# sourceMappingURL=config.d.ts.map