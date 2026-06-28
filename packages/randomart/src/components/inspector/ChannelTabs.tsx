import { Button } from '@repo/ui/Button';
import { cn } from '@repo/ui/cn';
import { setActiveChannel } from '../../stores/randomart/actions/display';
import { useActiveChannel, useCorrelatedRGB } from '../../stores/randomart/selectors';

const channels: ('red' | 'green' | 'blue')[] = ['red', 'green', 'blue'];

const LinkIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

const SplitIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M3 12h18" />
    <path d="M12 3v18" />
  </svg>
);

export function ChannelTabs() {
  const activeChannel = useActiveChannel();
  const correlated = useCorrelatedRGB();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h4 className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
          Color Channels
        </h4>
        <span className="text-muted-foreground/80 flex items-center gap-1 text-xs">
          {correlated ? (
            <>
              <LinkIcon className="h-3 w-3 text-amber-500" /> Linked (RGB Sync)
            </>
          ) : (
            <>
              <SplitIcon className="h-3 w-3 text-blue-400" /> Independent
            </>
          )}
        </span>
      </div>

      <div
        className={cn('grid grid-cols-3 gap-2', {
          'rounded-lg p-1 ring-1 ring-amber-500/20': correlated
        })}
      >
        {channels.map((channel) => {
          const isSelected = !correlated && activeChannel === channel;

          return (
            <Button
              key={channel}
              onClick={correlated ? undefined : () => setActiveChannel(channel)}
              disabled={correlated}
              variant="primary"
              className={cn('inline-flex flex-col text-xs break-all', {
                'bg-background text-muted-foreground hover:text-primary-foreground': !isSelected,
                'cursor-not-allowed opacity-60': correlated
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
