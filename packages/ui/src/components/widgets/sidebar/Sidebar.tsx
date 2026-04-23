import type { VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { cn } from "../../../utils/cn.js";
import { sidebarVariants } from "./sidebarVariants.js";

type SidebarVariant = "primary" | "secondary" | "accent";
type PanelPosition = "top" | "right" | "bottom" | "left";

interface SidebarContextValue {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextValue | null>(null);

function useSidebarContext() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("Sidebar compound components must be used within a Sidebar");
  }
  return context;
}

interface SidebarProps extends ComponentProps<"div">, VariantProps<typeof sidebarVariants> {
  defaultOpen?: boolean;
  variant?: SidebarVariant;
}

function Sidebar({
  children,
  ref,
  className,
  mobilePosition,
  desktopPosition,
  variant = "default",
  defaultOpen = true,
  ...props
}: SidebarProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggleSidebar = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const value = useMemo(() => ({ isOpen, toggleSidebar }), [isOpen, toggleSidebar]);

  return (
    <SidebarContext.Provider value={value}>
      <div
        ref={ref}
        className={cn(sidebarVariants({ variant, mobilePosition, desktopPosition }), className)}
        {...props}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  );
}

interface PanelProps extends ComponentProps<"div"> {
  position?: PanelPosition;
}

function Panel({ children, ref, className, ...props }: PanelProps) {
  return (
    <div ref={ref} className={cn("sidebar-panel", className)} {...props}>
      {children}
    </div>
  );
}

function Main({ children, ref, className, ...props }: ComponentProps<"div">) {
  const { isOpen } = useSidebarContext();
  return (
    <div ref={ref} className={cn("relative", className, { hidden: !isOpen })} {...props}>
      {children}
    </div>
  );
}

function Toggle({ className, ...props }: ComponentProps<"button">) {
  const { isOpen, toggleSidebar } = useSidebarContext();
  return (
    <button
      type="button"
      onClick={toggleSidebar}
      className={cn(className)}
      aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
      {...props}
    >
      {isOpen ? "✕" : "☰"}
    </button>
  );
}

function useSidebar() {
  return useSidebarContext();
}

Sidebar.Panel = Panel;
Sidebar.Main = Main;
Sidebar.Toggle = Toggle;
Sidebar.use = useSidebar;

export { Sidebar, sidebarVariants };
