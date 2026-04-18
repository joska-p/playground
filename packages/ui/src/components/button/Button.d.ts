import type { VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { buttonVariants } from "./buttonVariants";
interface ButtonProps extends ComponentProps<"button">, VariantProps<typeof buttonVariants> {
}
declare function Button({ ref, className, children, variant, size, type, ...props }: ButtonProps): import("react/jsx-runtime").JSX.Element;
export { Button };
//# sourceMappingURL=Button.d.ts.map