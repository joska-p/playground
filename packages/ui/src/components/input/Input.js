import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from "../../utils/cn";
import { inputVariants } from "./inputVariants";
function Input({ ref, className, variant, type = "text", ...props }) {
    return (_jsx("input", { className: cn(inputVariants({ variant, className })), ref: ref, type: type, ...props }));
}
export { Input };
