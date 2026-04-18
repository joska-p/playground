import type { ComponentProps } from "react";
export interface Props extends ComponentProps<"div"> {
    colors: [string, string, string, string, string];
    rotation: string;
}
declare function CornerCircles({ colors, rotation, className }: Props): import("react/jsx-runtime").JSX.Element;
declare namespace CornerCircles {
    var displayName: string;
}
export { CornerCircles };
//# sourceMappingURL=Corner-circles.d.ts.map