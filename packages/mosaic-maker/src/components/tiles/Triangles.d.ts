import type { ComponentProps } from "react";
export interface Props extends ComponentProps<"div"> {
    colors: [string, string, string, string, string];
    rotation: string;
}
declare function Triangles({ colors, rotation, className }: Props): import("react/jsx-runtime").JSX.Element;
declare namespace Triangles {
    var displayName: string;
}
export { Triangles };
//# sourceMappingURL=Triangles.d.ts.map