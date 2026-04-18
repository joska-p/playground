import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from "../../utils/cn";
import { labelVariants } from "./labelVariants";
function Label({ children, ref, className, variant, ...props }) {
    return (_jsx("label", { className: cn(labelVariants({ variant, className })), ref: ref, ...props, children: children }));
}
export { Label };
