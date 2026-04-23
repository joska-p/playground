import type { VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { cn } from "../../../utils/cn.js";
import { sidebarVariants, sidebarPanelVariants } from "./sidebarVariants.js";

interface SidebarContextValue {
  isOpen: boolean;
  toggleSidebar: () => void;
  variant: "primary" | "secondary" | "accent";
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
  variant?: "primary" | "secondary" | "accent";
}

function Sidebar({
  children,
  ref,
  className,
  mobilePosition,
  desktopPosition,
  variant = "primary",
  defaultOpen = true,
  ...props
}: SidebarProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggleSidebar = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const value = useMemo(
    () => ({ isOpen, toggleSidebar, variant }),
    [isOpen, toggleSidebar, variant]
  );

  return (
    <SidebarContext.Provider value={value}>
      <div
        ref={ref}
        className={cn(sidebarVariants({ mobilePosition, desktopPosition, variant }), className)}
        {...props}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  );
}

interface PanelProps extends ComponentProps<"div">, VariantProps<typeof sidebarPanelVariants> {}

function Panel({ children, ref, className, variant, position, ...props }: PanelProps) {
  const ctx = useSidebarContext();
  const v = variant ?? ctx.variant;
  return (
    <div
      ref={ref}
      className={cn(sidebarPanelVariants({ variant: v, position: position as any }), className)}
      {...props}
    >
      {children}
    </div>
  );
}

function Main({ children, ref, className, ...props }: ComponentProps<"div">) {
  const { isOpen } = useSidebarContext();
  return (
    <div ref={ref} className={cn(className, { hidden: !isOpen })} {...props}>
      {children}
    </div>
  );
}

function Toggle({ className, ...props }: ComponentProps<"button">) {
  const { isOpen, toggleSidebar, variant } = useSidebarContext();
  return (
    <button
      type="button"
      onClick={toggleSidebar}
      className={cn(
        "cursor-pointer rounded p-2 transition-colors",
        {
          "bg-primary text-primary-foreground hover:bg-primary/90": variant === "primary",
          "bg-secondary text-secondary-foreground hover:bg-secondary/90": variant === "secondary",
          "bg-accent text-accent-foreground hover:bg-accent/90": variant === "accent",
        },
        className
      )}
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

export { Sidebar, sidebarVariants, sidebarPanelVariants };
