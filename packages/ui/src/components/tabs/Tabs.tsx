import type { VariantProps } from 'class-variance-authority';
import type { ReactNode } from 'react';
import { useId } from 'react';
import { cn } from '../../utils/cn';
import { tabsVariants, tabTriggerVariants } from './tabsVariants';

type Tab = {
  label: string;
  content: ReactNode;
};

type TabsProps = {
  tabs: Tab[];
  className?: string;
} & VariantProps<typeof tabsVariants>;

function Tabs({ tabs, className, variant }: TabsProps) {
  const id = useId();
  const prefix = `tab-${id}`;

  return (
    <div
      className={cn(tabsVariants({ variant }), className)}
    >
      <div className="tabs-container">
        <div className="flex border-b border-border">
          {tabs.map((tab, i) => (
            <label
              key={i}
              htmlFor={`${prefix}-${String(i)}`}
              className={cn(tabTriggerVariants({ variant }))}
            >
              {tab.label}
            </label>
          ))}
        </div>

        {tabs.map((tab, i) => (
          <input
            key={i}
            type="radio"
            name={`tabs-${prefix}`}
            id={`${prefix}-${String(i)}`}
            defaultChecked={i === 0}
            className="hidden"
          />
        ))}

        {tabs.map((tab, i) => (
          <div
            key={i}
            id={`panel-${prefix}-${String(i)}`}
            className={cn(
              'hidden px-5 py-5 text-sm text-muted-foreground leading-relaxed',
              'starting:opacity-0 starting:translate-y-1',
              'animate-[tabIn_0.2s_ease]'
            )}
          >
            {tab.content}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes tabIn { from { opacity:0; transform:translateY(4px); } }
        .tabs-container:has(#${prefix}-0:checked) label[for="${prefix}-0"],
        .tabs-container:has(#${prefix}-1:checked) label[for="${prefix}-1"],
        .tabs-container:has(#${prefix}-2:checked) label[for="${prefix}-2"],
        .tabs-container:has(#${prefix}-3:checked) label[for="${prefix}-3"],
        .tabs-container:has(#${prefix}-4:checked) label[for="${prefix}-4"],
        .tabs-container:has(#${prefix}-5:checked) label[for="${prefix}-5"],
        .tabs-container:has(#${prefix}-6:checked) label[for="${prefix}-6"],
        .tabs-container:has(#${prefix}-7:checked) label[for="${prefix}-7"],
        .tabs-container:has(#${prefix}-8:checked) label[for="${prefix}-8"],
        .tabs-container:has(#${prefix}-9:checked) label[for="${prefix}-9"] {
          color: var(--foreground) !important;
        }
        .tabs-container:has(#${prefix}-0:checked) label[for="${prefix}-0"]::after,
        .tabs-container:has(#${prefix}-1:checked) label[for="${prefix}-1"]::after,
        .tabs-container:has(#${prefix}-2:checked) label[for="${prefix}-2"]::after,
        .tabs-container:has(#${prefix}-3:checked) label[for="${prefix}-3"]::after,
        .tabs-container:has(#${prefix}-4:checked) label[for="${prefix}-4"]::after,
        .tabs-container:has(#${prefix}-5:checked) label[for="${prefix}-5"]::after,
        .tabs-container:has(#${prefix}-6:checked) label[for="${prefix}-6"]::after,
        .tabs-container:has(#${prefix}-7:checked) label[for="${prefix}-7"]::after,
        .tabs-container:has(#${prefix}-8:checked) label[for="${prefix}-8"]::after,
        .tabs-container:has(#${prefix}-9:checked) label[for="${prefix}-9"]::after {
          scale: 1;
        }
        .tabs-container:has(#${prefix}-0:checked) #panel-${prefix}-0,
        .tabs-container:has(#${prefix}-1:checked) #panel-${prefix}-1,
        .tabs-container:has(#${prefix}-2:checked) #panel-${prefix}-2,
        .tabs-container:has(#${prefix}-3:checked) #panel-${prefix}-3,
        .tabs-container:has(#${prefix}-4:checked) #panel-${prefix}-4,
        .tabs-container:has(#${prefix}-5:checked) #panel-${prefix}-5,
        .tabs-container:has(#${prefix}-6:checked) #panel-${prefix}-6,
        .tabs-container:has(#${prefix}-7:checked) #panel-${prefix}-7,
        .tabs-container:has(#${prefix}-8:checked) #panel-${prefix}-8,
        .tabs-container:has(#${prefix}-9:checked) #panel-${prefix}-9 {
          display: block;
        }
      `}</style>
    </div>
  );
}

export { Tabs };
export type { TabsProps, Tab };
