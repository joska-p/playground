import { CircleCheck, Globe, TriangleAlert } from 'lucide-react';
import { NotificationItem } from '../../components/data-display';
import { DemoSection } from '../layout/DemoSection';

export function NotificationItemDemo() {
  return (
    <DemoSection
      id="component-notificationitem"
      title="NotificationItem"
      intro="Notification row with icon, title, and timestamp. The icon background picks up the variant color."
      apiRows={[
        { prop: 'icon', type: 'ReactNode', default: 'required' },
        { prop: 'title', type: 'string', default: 'required' },
        { prop: 'timestamp', type: 'string', default: 'required' },
        { prop: 'variant', type: 'ColorVariant', default: '"primary"' }
      ]}
      code={`<NotificationItem
  icon={<Bell />}
  title="New version"
  timestamp="2 hours ago"
  variant="primary"
/>`}
    >
      <div className="max-w-sm space-y-3">
        <NotificationItem
          icon={<CircleCheck className="h-4 w-4" />}
          title="New version released"
          timestamp="2 hours ago"
          variant="primary"
        />
        <NotificationItem
          icon={<Globe className="h-4 w-4" />}
          title="Deployment complete"
          timestamp="1 day ago"
          variant="secondary"
        />
        <NotificationItem
          icon={<TriangleAlert className="h-4 w-4" />}
          title="Build failed"
          timestamp="3 days ago"
          variant="destructive"
        />
      </div>
    </DemoSection>
  );
}
