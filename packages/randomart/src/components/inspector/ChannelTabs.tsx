import { Button } from '@repo/ui/Button';
import { cn } from '@repo/ui/cn';
import { setActiveChannel } from '../../stores/randomart/actions/display';
import {
  useActiveChannel,
  useCorrelatedRGB
} from '../../stores/randomart/selectors';

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
    <path d="M16 3h5v5" />
    <path d="M8 3H3v5" />
    <path d="M12 22v-8.3a4 4 0 0 0-1.172-2.872L3 3" />
    <path d="m15 9 6-6" />
  </svg>
);

export function ChannelTabs() {
  const activeChannel = useActiveChannel();
  const correlated = useCorrelatedRGB();

  return (
    <div className="flex flex-col gap-2">
      {/* Mode badge */}
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
          Channels
        </span>
        <span
          className={cn(
            'ml-auto inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase',
            correlated
              ? 'bg-amber-500/15 text-amber-400 ring-1 ring-amber-500/30'
              : 'bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/30'
          )}
        >
          {correlated ? (
            <>
              <LinkIcon className="h-2.5 w-2.5" />
              Linked
            </>
          ) : (
            <>
              <SplitIcon className="h-2.5 w-2.5" />
              Split
            </>
          )}
        </span>
      </div>

      {/* Explanation */}
      <p className="text-muted-foreground text-[11px] leading-snug">
        {correlated
          ? 'All three channels are derived from a single shared expression tree. R, G, B are sub-branches of the same root.'
          : 'Each channel has its own independently generated expression tree seeded separately.'}
      </p>

      {/* Tabs */}
      <div
        className={cn('grid grid-cols-3 gap-2', {
          'rounded-lg p-1 ring-1 ring-amber-500/20': correlated
        })}
      >
        {channels.map((channel) => (
          <Button
            key={channel}
            // In correlated mode all channels share one tree — switching is
            // meaningless and causes downstream components to crash.
            onClick={correlated ? undefined : () => setActiveChannel(channel)}
            disabled={correlated}
            variant="primary"
            className={cn('inline-flex flex-col text-xs break-all', {
              'bg-background text-muted-foreground hover:text-primary-foreground':
                !correlated && activeChannel !== channel,
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
        ))}
      </div>

      {/* Linked: show a visual connector below tabs */}
      {correlated && (
        <div className="flex items-center gap-1 px-1">
          <div className="h-px flex-1 bg-amber-500/30" />
          <LinkIcon className="h-3 w-3 text-amber-500/50" />
          <div className="h-px flex-1 bg-amber-500/30" />
        </div>
      )}
    </div>
  );
}
