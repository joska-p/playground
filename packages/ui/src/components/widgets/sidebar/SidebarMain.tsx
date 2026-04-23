import type { ComponentProps } from "react";
import { cn } from "../../../utils/cn.js";

function SidebarMain({ children, ref, className, ...props }: ComponentProps<"div">) {
  return (
    <div ref={ref} className={cn("relative [grid-area:main]", className)} {...props}>
      {children}
    </div>
  );
}

export { SidebarMain };
