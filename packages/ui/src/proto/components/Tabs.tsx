import {
  createContext,
  useContext,
  useId,
  useState,
  type ReactNode,
} from "react";
import { cn } from "../lib/cn";
import { colorVarStyle, type ColorVariant } from "../lib/colorVariant";

interface TabsContextValue {
  value: string;
  setValue: (v: string) => void;
  name: string;
}
const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error("Tabs.* must be used inside <Tabs>");
  return ctx;
}

export interface TabsProps {
  /** Uncontrolled initial tab. */
  defaultValue: string;
  /** Controlled active tab. */
  value?: string;
  onValueChange?: (value: string) => void;
  children: ReactNode;
  className?: string;
  variant?: ColorVariant;
}

/**
 * Tabs — built on real (visually-hidden) radio inputs, so the tab group is
 * a native, form-participating radio group under the hood: arrow-key
 * navigation and screen-reader semantics come for free.
 */
export function Tabs({
  defaultValue,
  value: controlledValue,
  onValueChange,
  children,
  className,
  variant = "primary",
}: TabsProps) {
  const [uncontrolled, setUncontrolled] = useState(defaultValue);
  const name = useId();
  const value = controlledValue ?? uncontrolled;
  const setValue = (v: string) => {
    setUncontrolled(v);
    onValueChange?.(v);
  };

  return (
    <TabsContext.Provider value={{ value, setValue, name }}>
      <div
        className={cn("tabs-container bg-surface rounded-lg overflow-hidden", className)}
        style={{ boxShadow: "var(--shadow-sm)", ...colorVarStyle(variant) }}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export function TabsList({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("flex border-b border-border", className)}>{children}</div>;
}

export function TabsTrigger({
  value,
  children,
  className,
}: {
  value: string;
  children: ReactNode;
  className?: string;
}) {
  const { value: active, setValue, name } = useTabsContext();
  const isActive = active === value;
  return (
    <label
      className={cn(
        "tab-trigger text-foreground-dim px-5 py-3 text-[13px] font-medium transition-colors",
        className
      )}
      data-active={isActive}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={isActive}
        onChange={() => setValue(value)}
        className="sr-only"
      />
      {children}
    </label>
  );
}

export function TabsContent({
  value,
  children,
  className,
}: {
  value: string;
  children: ReactNode;
  className?: string;
}) {
  const { value: active } = useTabsContext();
  const isActive = active === value;
  return (
    <div
      role="tabpanel"
      hidden={!isActive}
      data-active={isActive}
      className={cn("tab-panel px-5 py-5 text-[13px] leading-relaxed text-foreground-muted", className)}
    >
      {children}
    </div>
  );
}
