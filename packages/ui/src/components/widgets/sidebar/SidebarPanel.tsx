import type { ComponentProps } from "react";
import { cn } from "../../../utils/cn.js";
import { useSidebarContext } from "./SidebarContext.js";

function SidebarPanel({ children, ref, className, ...props }: ComponentProps<"div">) {
  const { isOpen } = useSidebarContext();
  return (
    <div
      ref={ref}
      className={cn("sidebar-panel [grid-area:panel]", className, { hidden: !isOpen })}
      {...props}
    >
      {children}
    </div>
  );
}

export { SidebarPanel };
