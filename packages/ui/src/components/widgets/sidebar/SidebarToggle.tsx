import type { ComponentProps } from "react";
import { useMemo } from "react";
import { cn } from "../../../utils/cn.js";
import { useSidebarContext } from "./SidebarContext.js";
import { Button } from "../../button/Button.js";

export function SidebarToggle({ className, children, ...props }: ComponentProps<"button">) {
  const { isOpen, toggleSidebar, desktopPosition } = useSidebarContext();

  const positionClasses = useMemo(() => {
    const pos = desktopPosition || "left";

    if (isOpen) return "[grid-area:panel] top-2 right-2";

    switch (pos) {
      case "left":
        return "top-2 left-2";
      case "right":
        return "top-2 right-2";
      case "top":
        return "top-2 right-2";
      case "bottom":
        return "bottom-2 right-2";
      default:
        return "top-2 left-2";
    }
  }, [isOpen, desktopPosition]);

  return (
    <Button
      type="button"
      size="icon"
      onClick={toggleSidebar}
      className={cn("sidebar-toggle absolute z-50", positionClasses, className)}
      aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
      {...props}
    >
      {children ||
        (isOpen ? (
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        ) : (
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        ))}
    </Button>
  );
}
