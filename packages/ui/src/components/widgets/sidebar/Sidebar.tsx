import type { VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { useCallback, useMemo, useState } from "react";
import { cn } from "../../../utils/cn";
import type { SidebarContextValue } from "./sidebarContext";
import { SidebarContext } from "./sidebarContext";
import { SidebarMain } from "./SidebarMain";
import { SidebarPanel } from "./SidebarPanel";
import { SidebarToggle } from "./SidebarToggle";
import { sidebarVariants } from "./sidebarVariants";
import { useSidebarContext } from "./useSidebarContext";

export type SidebarProps = {
  defaultOpen?: boolean;
} & ComponentProps<"div"> &
  VariantProps<typeof sidebarVariants>;

export function Sidebar({
  children,
  ref,
  className,
  mobilePosition = "bottom",
  desktopPosition = "bottom",
  variant,
  defaultOpen = true,
  ...props
}: SidebarProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggleSidebar = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const value = useMemo(
    (): SidebarContextValue => ({
      isOpen,
      toggleSidebar,
      desktopPosition: desktopPosition ?? "bottom",
      mobilePosition: mobilePosition ?? "bottom",
    }),
    [isOpen, toggleSidebar, desktopPosition, mobilePosition]
  );

  return (
    <SidebarContext.Provider value={value}>
      <div
        ref={ref}
        className={cn(
          "relative min-h-full",
          sidebarVariants({ variant, mobilePosition, desktopPosition }),
          className
        )}
        {...props}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  );
}

Sidebar.Panel = SidebarPanel;
Sidebar.Main = SidebarMain;
Sidebar.Toggle = SidebarToggle;
Sidebar.use = useSidebarContext;
