import type { ComponentProps } from "react";
export interface Props extends ComponentProps<"div"> {
    colors: [string, string, string, string, string];
    rotation: string;
}
declare function Diamond({ colors, rotation, className }: Props): import("react/jsx-runtime").JSX.Element;
declare namespace Diamond {
    var displayName: string;
}
export { Diamond };
//# sourceMappingURL=Diamond.d.ts.map