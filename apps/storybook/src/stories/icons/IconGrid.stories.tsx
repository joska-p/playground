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
    <div className="flex w-full max-w-4xl flex-col gap-8 p-8">
      <div className="border-border flex items-center gap-3 border-b pb-4">
        <h1 className="text-foreground font-mono text-xs tracking-widest uppercase">
          Icon Library
        </h1>
        <span className="text-muted-foreground font-mono text-[10px]">
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
                className="group hover:bg-muted flex cursor-pointer flex-col items-center gap-1.5 rounded-xl p-2.5 transition-all duration-200"
                title={name}
              >
                <Icon className="size-6 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:scale-110" />
                <span className="text-muted-foreground w-full truncate text-center font-mono text-[8px] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  {name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="border-border border-t pt-6">
        <h2 className="text-muted-foreground mb-3 font-mono text-xs tracking-widest uppercase">
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
                <Icon
                  className="transition-all duration-200"
                  style={{ width: s, height: s }}
                />
                <span className="text-muted-foreground font-mono text-[9px]">
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
