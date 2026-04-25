import type { VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "../../utils/cn.js";
import { calloutVariants, calloutIcons } from "./calloutVariants.js";

interface CalloutProps extends ComponentProps<"div">, VariantProps<typeof calloutVariants> {
  title?: string;
}

function Callout({ className, variant, title, children, ...props }: CalloutProps) {
  const Icon = calloutIcons[variant ?? "info"];
  return (
    <div className={cn(calloutVariants({ variant, className }))} {...props}>
      <Icon className="h-5 w-5" />
      <div className="flex-1 [&>p]:m-0">
        {title && <p className="mb-1 font-semibold">{title}</p>}
        {children}
      </div>
    </div>
  );
}

export { Callout };
export type { CalloutProps };