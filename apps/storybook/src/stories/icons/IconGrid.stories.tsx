import { iconMap, type IconName } from '@repo/ui/icons';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentPropsWithoutRef } from 'react';

const icons = Object.keys(iconMap) as IconName[];

const meta: Meta<ComponentPropsWithoutRef<'svg'>> = {
  title: 'Components/Icons',
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<ComponentPropsWithoutRef<'svg'>>;

export const AllIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-8 p-8 w-full max-w-4xl">
      <div className="flex items-center gap-3 border-b border-border pb-4">
        <h1 className="font-mono text-xs tracking-widest uppercase text-foreground">
          Icon Library
        </h1>
        <span className="font-mono text-[10px] text-muted-foreground">
          {icons.length} icons
        </span>
      </div>

      <div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(64px,1fr))] gap-3">
          {icons.map((name) => {
            const Icon = iconMap[name];
            return (
              <div
                key={name}
                className="group flex flex-col items-center gap-1.5 p-2.5 rounded-xl hover:bg-muted transition-all duration-200 cursor-pointer"
                title={name}
              >
                <Icon className="size-6 transition-all duration-200 group-hover:scale-110 group-hover:-translate-y-0.5" />
                <span className="font-mono text-[8px] text-muted-foreground text-center truncate w-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="border-t border-border pt-6">
        <h2 className="font-mono text-xs tracking-widest uppercase mb-3 text-muted-foreground">
          Size Scale
        </h2>
        <div className="flex items-end gap-4">
          {[12, 16, 20, 24, 32, 40, 48].map((s) => {
            const Icon = iconMap['box'];
            return (
              <div
                key={s}
                className="flex flex-col items-center gap-1.5"
              >
                <Icon className="transition-all duration-200" style={{ width: s, height: s }} />
                <span className="font-mono text-[9px] text-muted-foreground">
                  {s}px
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  ),
};
