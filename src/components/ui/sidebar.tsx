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

interface SidebarProviderProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
}

const SidebarProvider = ({ ref, className, children, ...props }: SidebarProviderProps) => {
  const [open, setOpen] = useState(false);

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
      <div ref={ref} {...props} className={cn("relative isolate overflow-hidden", className)}>
        {children}
      </div>
    </SidebarContext.Provider>
  );
};
SidebarProvider.displayName = "SidebarProvider";

/**
 * Sidebar
 */

const sidebarVariants = cva("absolute z-10 grid bg-background overflow-y-auto", {
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

interface SidebarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sidebarVariants> {
  ref?: React.Ref<HTMLDivElement>;
}

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
          "overflow-hidden",
          { "col-start-2": position === "right" },
          { "row-start-2": position === "bottom" },
          { "col-start-1 row-start-1": position === "left" },
          { "row-start-1": position === "top" },
          { "w-0": (position === "left" || position === "right") && state === "collapsed" },
          { "h-0": (position === "top" || position === "bottom") && state === "collapsed" }
        )}
      >
        {children}
      </div>
    </aside>
  );
};
Sidebar.displayName = "Sidebar";

/**
 * Sidebar trigger
 */

const sidebarTriggerVariants = cva("z-20  justify-self-center", {
  variants: {
    size: {
      sm: "h-6 w-6",
      md: "h-7 w-7",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

interface SidebarTriggerProps
  extends React.HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof sidebarTriggerVariants> {
  state: "expanded" | "collapsed";
  position: "left" | "right" | "top" | "bottom";
}

const SidebarTrigger = ({ state, size, position, className, ...props }: SidebarTriggerProps) => {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      className={cn(sidebarTriggerVariants({ size, className }))}
      onClick={toggleSidebar}
      {...props}
    >
      <span className="sr-only">Toggle sidebar</span>
      <Chevron position={position} state={state} />
    </button>
  );
};

export { Sidebar, SidebarProvider, SidebarTrigger };
