import type { ComponentProps } from "react";
export interface Props extends ComponentProps<"div"> {
    colors: [string, string, string, string, string];
    rotation: string;
}
declare const Rainbow: {
    ({ colors, rotation, className }: Props): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
export { Rainbow };
//# sourceMappingURL=Rainbow.d.ts.map