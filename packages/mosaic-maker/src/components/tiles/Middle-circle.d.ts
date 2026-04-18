import type { ComponentProps } from "react";
export interface Props extends ComponentProps<"div"> {
    colors: [string, string, string, string, string];
    rotation: string;
}
declare function MiddleCircle({ colors, rotation, className }: Props): import("react/jsx-runtime").JSX.Element;
declare namespace MiddleCircle {
    var displayName: string;
}
export { MiddleCircle };
//# sourceMappingURL=Middle-circle.d.ts.map