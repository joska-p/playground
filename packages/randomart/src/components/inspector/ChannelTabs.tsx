import { Button } from '@repo/ui/Button';
import { cn } from '@repo/ui/cn';
import { setActiveChannel } from '../../stores/randomart/actions';
import { useActiveChannel } from '../../stores/randomart/selectors/useActiveChannel';

const channels: ('red' | 'green' | 'blue')[] = ['red', 'green', 'blue'];

export function ChannelTabs() {
  const activeChannel = useActiveChannel();

  return (
    <div className="grid grid-cols-3 gap-2">
      {channels.map((channel) => (
        <Button
          key={channel}
          onClick={() => setActiveChannel(channel)}
          variant="primary"
          className={cn('inline-flex flex-col text-xs break-all', {
            'bg-background text-muted-foreground': activeChannel != channel
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
          Channel Tree
        </Button>
      ))}
    </div>
  );
}
