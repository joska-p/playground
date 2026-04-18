import { type ComponentType } from "react";
export interface TileComponentProps {
    colors: [string, string, string, string, string];
    rotation: string;
    className?: string;
}
declare const tileComponents: Record<string, ComponentType<TileComponentProps>>;
export interface Props {
    name: keyof typeof tileComponents;
    colors: [string, string, string, string, string];
    rotation: string;
    className?: string;
}
declare function Tile({ name, colors, rotation, className }: Props): import("react/jsx-runtime").JSX.Element | null;
declare namespace Tile {
    var displayName: string;
}
export { Tile };
//# sourceMappingURL=Tile.d.ts.map