import { cn } from "@lib/utils";
import { Chevron } from "@ui/chevron";
import { cva, type VariantProps } from "class-variance-authority";
import { createContext, useCallback, useContext, useMemo, useState } from "react";

/**
 * Sidebar context
 */

type SidebarContext = {
  state: "expanded" | "collapsed";
  toggleSidebar: () => void;
};

const SidebarContext = createContext<SidebarContext | null>(null);

function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }

  return context;
}

/**
 * Sidebar provider
 */

type SidebarProviderProps = React.HTMLAttributes<HTMLDivElement> & {
  ref?: React.Ref<HTMLDivElement>;
};

const SidebarProvider = ({ ref, className, children }: SidebarProviderProps) => {
  const [open, setOpen] = useState(true);

  const toggleSidebar = useCallback(() => {
    setOpen((open) => !open);
  }, [open]);

  const contextValue = useMemo<SidebarContext>(
    () => ({
      state: open ? "expanded" : "collapsed",
      toggleSidebar,
    }),
    [open]
  );

  return (
    <SidebarContext.Provider value={contextValue}>
      <div ref={ref} className={cn("relative", className)}>
        {children}
      </div>
    </SidebarContext.Provider>
  );
};
SidebarProvider.displayName = "SidebarProvider";

/**
 * Sidebar
 */

const sidebarVariants = cva("z-10 absolute grid overflow-y-auto transition-transform", {
  variants: {
    position: {
      left: "left-0 top-0 grid-cols-[1fr_auto] h-full w-auto",
      bottom: "bottom-0 right-0 grid-rows-[1fr_auto] w-full h-auto",
      right: "right-0 top-0 grid-cols-[auto_1fr] h-full w-auto",
      top: "top-0 right-0 grid-rows-[auto_1fr] w-full h-auto",
    },
  },
  defaultVariants: {
    position: "right",
  },
});

type SidebarProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof sidebarVariants> & {
    ref?: React.Ref<HTMLDivElement>;
  };

const Sidebar = ({ ref, position = "right", className, children, ...props }: SidebarProps) => {
  const { state } = useSidebar();
  return (
    <aside ref={ref} {...props} className={cn(sidebarVariants({ position, className }))}>
      <SidebarTrigger
        state={state}
        position={position as "left" | "right" | "top" | "bottom"}
        className={cn(
          { "col-start-1": position === "right" },
          { "row-start-1": position === "bottom" },
          { "col-start-2": position === "left" },
          { "row-start-2": position === "top" }
        )}
      />

      <div
        className={cn(
          "overflow-hidden bg-background/90 p-2",
          { "col-start-2": position === "right" },
          { "row-start-2": position === "bottom" },
          { "col-start-1 row-start-1": position === "left" },
          { "row-start-1": position === "top" },
          { "w-0 p-0": (position === "left" || position === "right") && state === "collapsed" },
          { "h-0 p-0": (position === "top" || position === "bottom") && state === "collapsed" }
        )}
      >
        {children}
      </div>
    </aside>
  );
};
Sidebar.displayName = "Sidebar";

/**
 * Sidebar content
 */

type SidebarContentProps = React.HTMLAttributes<HTMLDivElement> & {
  ref?: React.Ref<HTMLDivElement>;
};

const SidebarContent = ({ ref, className, children, ...props }: SidebarContentProps) => {
  return (
    <div ref={ref} {...props} className={cn(className)}>
      {children}
    </div>
  );
};

/**
 * Sidebar trigger
 */

type SidebarTriggerProps = React.HTMLAttributes<HTMLButtonElement> & {
  state: "expanded" | "collapsed";
  position: "left" | "right" | "top" | "bottom";
};

const SidebarTrigger = ({ state, position, className, ...props }: SidebarTriggerProps) => {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      className={cn("z-20 h-8 w-7 content-center bg-background/90 p-1", className)}
      onClick={toggleSidebar}
      {...props}
    >
      <span className="sr-only">Toggle sidebar</span>
      <Chevron position={position} state={state} />
    </button>
  );
};

export { Sidebar, SidebarContent, SidebarProvider, SidebarTrigger };
