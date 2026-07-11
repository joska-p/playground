import { Badge } from '../components/data-display/badge/Badge';
import { NotificationItem } from '../components/data-display/notification-item/NotificationItem';
import { SectionHeader } from '../components/data-display/section-header/SectionHeader';
import { Button } from '../components/data-entry/button/Button';
import { Icon } from '../components/icons/Icon';

const RECENT_SURVEYS = [
  {
    icon: <Icon name="sparkles" />,
    title: 'New contour seed #201 surveyed',
    timestamp: '2 minutes ago',
    variant: 'primary' as const
  },
  {
    icon: <Icon name="flame" />,
    title: 'Volcanic zone density updated',
    timestamp: '18 minutes ago',
    variant: 'warning' as const
  },
  {
    icon: <Icon name="data-viz" />,
    title: 'Resolution bumped to 1024px',
    timestamp: '1 hour ago',
    variant: 'secondary' as const
  }
];

export function AtlasFooter() {
  return (
    <footer className="border-border/30 mx-auto max-w-6xl border-t px-6 py-16">
      <SectionHeader
        variant="secondary"
        title="Recent Surveys"
        description="Latest changes from the field."
        iconName="sparkles"
      />

      <div className="mt-6 flex flex-col gap-2">
        {RECENT_SURVEYS.map((survey) => (
          <NotificationItem
            key={survey.title}
            icon={survey.icon}
            title={survey.title}
            timestamp={survey.timestamp}
            variant={survey.variant}
          />
        ))}
      </div>

      <div className="border-border/30 mt-12 flex flex-col items-center gap-4 border-t pt-8 text-center">
        <Badge
          appearance="outline"
          variant="default"
        >
          Atlas v0.1.0 — cartographer's draft
        </Badge>
        <p className="text-foreground-muted text-xs">
          Built with EdgeCard, Hero, Badge, Card, Accordion, Tabs, FloatingNav, and more.
        </p>
        <div className="flex gap-2">
          <Button
            variant="link"
            size="sm"
          >
            <Icon name="github" />
            Source
          </Button>
          <Button
            variant="link"
            size="sm"
          >
            <Icon name="book" />
            Docs
          </Button>
        </div>
      </div>
    </footer>
  );
}
