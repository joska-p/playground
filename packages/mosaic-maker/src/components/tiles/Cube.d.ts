import type { ComponentProps } from "react";
export interface Props extends ComponentProps<"div"> {
    colors: [string, string, string, string, string];
    rotation: string;
}
declare function Cube({ colors, rotation, className }: Props): import("react/jsx-runtime").JSX.Element;
declare namespace Cube {
    var displayName: string;
}
export { Cube };
//# sourceMappingURL=Cube.d.ts.map