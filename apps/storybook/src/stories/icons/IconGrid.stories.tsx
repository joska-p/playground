import { iconMap } from '@repo/ui/iconMap';
import type { IconName, IconProps } from '@repo/ui/icons';
import type { Meta, StoryObj } from '@storybook/react-vite';

const icons = Object.keys(iconMap) as IconName[];

const meta: Meta<IconProps> = {
  title: 'Components/Icons',
  parameters: { layout: 'centered' },
  argTypes: {
    size: { control: { type: 'range', min: 12, max: 48, step: 4 } },
    variant: {
      options: [
        'primary',
        'secondary',
        'accent',
        'generative',
        'color',
        'image',
        'data-viz',
        'random',
      ],
      control: { type: 'select' },
    },
  },
  args: { size: 24, variant: 'primary' },
};

export default meta;
type Story = StoryObj<IconProps>;

export const AllIcons: Story = {
  render: (args) => (
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
                <Icon
                  {...args}
                  className="transition-all duration-200 group-hover:scale-110 group-hover:-translate-y-0.5"
                />
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
          Variant Colors
        </h2>
        <div className="flex flex-wrap gap-4">
          {(
            [
              'primary',
              'secondary',
              'accent',
              'generative',
              'color',
              'image',
              'data-viz',
              'random',
            ] as const
          ).map((v) => {
            const Icon = iconMap['sparkles'];
            return (
              <div
                key={v}
                className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border/50"
              >
                <Icon
                  size={18}
                  variant={v}
                />
                <span className="font-mono text-[10px] text-muted-foreground">
                  {v}
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
                <Icon size={s} />
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
