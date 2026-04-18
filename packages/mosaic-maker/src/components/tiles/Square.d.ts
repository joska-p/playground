import type { ComponentProps } from "react";
export interface Props extends ComponentProps<"div"> {
    colors: [string, string, string, string, string];
    rotation: string;
}
declare function Square({ colors, rotation, className }: Props): import("react/jsx-runtime").JSX.Element;
declare namespace Square {
    var displayName: string;
}
export { Square };
//# sourceMappingURL=Square.d.ts.map