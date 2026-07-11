import { createContext, useContext, useId, type ReactNode } from 'react';
import { cn } from '../../../lib/cn';
import type { ColorVariant } from '../../../lib/colorVariant';
import { tabUnderlineVariants } from './variants';

interface TabsContextValue {
  value: string;
  setValue: (v: string) => void;
  name: string;
  variant: ColorVariant;
}
const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('Tabs.* must be used inside <Tabs>');
  return ctx;
}

export interface TabsProps {
  value: string;
  onValueChange: (value: string) => void;
  children: ReactNode;
  className?: string;
  variant?: ColorVariant;
}

export function Tabs({
  value,
  onValueChange,
  children,
  className,
  variant = 'primary'
}: TabsProps) {
  const name = useId();

  return (
    <TabsContext.Provider value={{ value, setValue: onValueChange, name, variant }}>
      <div
        className={cn('tabs-container bg-surface overflow-hidden rounded-lg shadow-sm', className)}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export function TabsList({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('border-border flex border-b', className)}>{children}</div>;
}

export function TabsTrigger({
  value,
  children,
  className
}: {
  value: string;
  children: ReactNode;
  className?: string;
}) {
  const { value: active, setValue, name, variant } = useTabsContext();
  const isActive = active === value;
  return (
    <label
      className={cn(
        'group tab-trigger text-foreground-dim relative cursor-pointer px-5 py-3 text-[13px] font-medium transition-colors select-none',
        className
      )}
      data-active={isActive}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={isActive}
        onChange={() => {
          setValue(value);
        }}
        className="sr-only"
      />
      {children}
      <span
        className={cn(
          'absolute inset-x-0 -bottom-px h-0.5 scale-x-0 rounded-sm transition-transform duration-200',
          'group-data-[active=true]:scale-x-100',
          tabUnderlineVariants({ variant })
        )}
      />
    </label>
  );
}

export function TabsContent({
  value,
  children,
  className
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
      className={cn(
        'tab-panel text-foreground-muted px-5 py-5 text-[13px] leading-relaxed',
        className
      )}
    >
      {children}
    </div>
  );
}
