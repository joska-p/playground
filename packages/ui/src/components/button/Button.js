import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from "../../utils/cn";
import { buttonVariants } from "./buttonVariants";
function Button({ ref, className, children, variant, size, type = "button", ...props }) {
    return (_jsx("button", { className: cn(buttonVariants({ variant, size, className })), type: type, ref: ref, ...props, children: children }));
}
export { Button };
