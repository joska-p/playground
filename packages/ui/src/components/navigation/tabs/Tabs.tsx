import type { VariantProps } from 'class-variance-authority';
import type { ComponentProps, ReactNode } from 'react';
import { useId } from 'react';
import { cn } from '../../../utils/cn';
import { tabsVariants, tabTriggerVariants } from './tabsVariants';

type Tab = {
  label: string;
  content: ReactNode;
};

type TabsProps = {
  tabs: Tab[];
} & ComponentProps<'div'> &
  VariantProps<typeof tabsVariants>;

function Tabs({ ref, tabs, className, variant, ...props }: TabsProps) {
  const uniqueId = useId();

  return (
    <div
      ref={ref}
      className={cn(tabsVariants({ variant }), className)}
      {...props}
    >
      {/* 1. Header Navigation List */}
      <div className="border-border flex scrollbar-none overflow-x-auto border-b">
        {tabs.map((tab, i) => {
          const tabId = `${uniqueId}-tab-${i}`;
          return (
            <div
              key={i}
              className="relative"
            >
              {/* The radio input acts as the hidden peer state tracker */}
              <input
                type="radio"
                name={`group-${uniqueId}`}
                id={tabId}
                defaultChecked={i === 0}
                className="peer sr-only"
              />
              <label
                htmlFor={tabId}
                className={cn(tabTriggerVariants())}
              >
                {tab.label}
              </label>
            </div>
          );
        })}
      </div>

      {/* 2. Content Display Panels */}
      <div className="relative">
        {tabs.map((tab, i) => {
          const tabId = `${uniqueId}-tab-${i}`;
          return (
            <div
              key={i}
              className={cn(
                'text-muted-foreground hidden p-5 text-sm leading-relaxed',
                // This targets the container's header input state effortlessly using tailwind :has selectors
                `has-[:opacity]:animate-[tabIn_0.2s_ease]`,
                `[.tabs-container:has(#${tabId}:checked)_&]:block` // Fallback reference styling rule
              )}
              style={{
                // Inline target block rendering tied to specific active inputs dynamically
                display: `var(--display-tab-${i}, none)`
              }}
            >
              {/* Inline layout injector variable mapping rule to activate blocks without CSS injections */}
              <style>{`:has(#${tabId}:checked) { --display-tab-${i}: block; }`}</style>
              {tab.content}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { Tabs };
export type { Tab, TabsProps };
