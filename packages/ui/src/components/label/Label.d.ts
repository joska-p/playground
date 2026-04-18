import type { VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { labelVariants } from "./labelVariants";
interface labelProps extends ComponentProps<"label">, VariantProps<typeof labelVariants> {
}
declare function Label({ children, ref, className, variant, ...props }: labelProps): import("react/jsx-runtime").JSX.Element;
export { Label };
//# sourceMappingURL=Label.d.ts.map