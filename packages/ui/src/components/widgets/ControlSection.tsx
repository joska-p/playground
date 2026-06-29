import { cn } from '../../utils/cn';
import { ControlRenderer } from './controls';
import type { ControlSection as ControlSectionType } from './types';

type ControlSectionProps = {
  section: ControlSectionType;
  isOpen: boolean;
  onToggle: () => void;
};

export function ControlSection({ section, isOpen, onToggle }: ControlSectionProps) {
  const visibleControls = section.controls.filter((c) => !c.hidden);

  if (visibleControls.length === 0) return null;

  return (
    <div className="border-border border-b last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        className="text-muted-foreground hover:text-foreground hover:bg-muted/50 flex w-full items-center justify-between px-4 py-3 text-sm font-medium transition-colors duration-100"
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-2">
          {section.icon && <section.icon className="h-4 w-4" />}
          {section.label}
        </span>
        <svg
          className={cn('h-4 w-4 transition-transform duration-200', isOpen && 'rotate-180')}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <div
        className={cn(
          'grid transition-all duration-200 ease-out',
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        )}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col gap-3 px-4 pb-4">
            {visibleControls.map((control) => (
              <ControlRenderer
                key={control.id}
                control={control}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
