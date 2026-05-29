import type { ComponentProps } from "react";
import { cn } from "../../../utils/cn";
import { Button } from "../../button/Button";
import styles from "./sidebar.module.css";
import { useSidebarContext } from "./useSidebarContext";

export function SidebarToggle({ className, children, ...props }: ComponentProps<"button">) {
  const { isOpen, toggleSidebar } = useSidebarContext();

  return (
    <Button
      type="button"
      size="icon"
      variant="ghost"
      onClick={toggleSidebar}
      className={cn(styles.toggle, className)}
      aria-expanded={isOpen}
      aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
      {...props}
    >
      {children ??
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
