import type { ReactNode } from 'react';
import { useId } from 'react';
import { cn } from '../../utils/cn';

type Tab = {
  label: string;
  content: ReactNode;
};

type TabsProps = {
  tabs: Tab[];
  className?: string;
};

function Tabs({ tabs, className }: TabsProps) {
  const id = useId();
  const prefix = `tab-${id}`;

  return (
    <div
      className={cn('bg-surface rounded-lg overflow-hidden shadow-sm', className)}
    >
      <div className="tabs-container">
        <div className="flex border-b border-border">
          {tabs.map((tab, i) => (
            <label
              key={i}
              htmlFor={`${prefix}-${String(i)}`}
              className={cn(
                'text-muted-foreground px-5 py-3 text-sm font-medium transition-colors cursor-pointer',
                'relative after:absolute after:bottom-[-1px] after:left-0 after:right-0 after:h-0.5 after:bg-primary after:rounded-full after:scale-x-0 after:transition-transform after:duration-200'
              )}
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
          transform: scaleX(1);
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
