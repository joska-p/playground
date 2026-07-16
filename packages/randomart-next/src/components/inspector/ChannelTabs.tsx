import { Button } from '@repo/ui/data-entry';
import { cn } from '@repo/ui/lib/cn';
import { setActiveChannel } from '../../stores/randomart/actions/display';
import { useActiveChannel } from '../../stores/randomart/selectors';

const channels: ('red' | 'green' | 'blue')[] = ['red', 'green', 'blue'];

export function ChannelTabs() {
  const activeChannel = useActiveChannel();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h4 className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
          Color Channels
        </h4>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {channels.map((channel) => {
          const isSelected = activeChannel === channel;

          return (
            <Button
              key={channel}
              onClick={() => {
                setActiveChannel(channel);
              }}
              variant="primary"
              className={cn('inline-flex flex-col text-xs break-all', {
                'bg-background text-muted-foreground hover:text-primary-foreground': !isSelected
              })}
            >
              <span className="flex items-center gap-1.5">
                <span
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ backgroundColor: channel }}
                  aria-hidden="true"
                />
                {channel}
              </span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
