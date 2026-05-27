import type { ComponentProps } from "react";
import { cn } from "../../../utils/cn";
import styles from "./sidebar.module.css";

function SidebarPanel({ children, ref, className, ...props }: ComponentProps<"div">) {
  return (
    <div ref={ref} className={cn("sidebar-panel", styles.panel, className)} {...props}>
      {children}
    </div>
  );
}

export { SidebarPanel };
