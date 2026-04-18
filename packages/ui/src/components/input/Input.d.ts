import type { VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { inputVariants } from "./inputVariants";
interface InputProps extends ComponentProps<"input">, VariantProps<typeof inputVariants> {
}
declare function Input({ ref, className, variant, type, ...props }: InputProps): import("react/jsx-runtime").JSX.Element;
export { Input };
//# sourceMappingURL=Input.d.ts.map