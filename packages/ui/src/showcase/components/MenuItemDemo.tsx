import { Book, Cog, User } from 'lucide-react';
import { MenuItem } from '../../components/data-display';
import { DemoSection } from '../layout/DemoSection';

export function MenuItemDemo() {
  return (
    <DemoSection
      id="component-menuitem"
      title="MenuItem"
      intro="A styled button row with optional icon. The icon background picks up the variant color."
      apiRows={[
        { prop: 'icon', type: 'ReactNode', default: '—' },
        { prop: 'label', type: 'string', default: 'required' },
        { prop: 'variant', type: 'ColorVariant', default: '"default"' }
      ]}
      code={`<MenuItem icon={<Book />} label="docs" />
<MenuItem label="delete" variant="destructive" />`}
    >
      <div className="max-w-50 space-y-1 rounded-lg p-2 shadow-xs">
        <MenuItem
          icon={<Book className="h-4 w-4" />}
          label="documentation"
        />
        <MenuItem
          icon={<Cog className="h-4 w-4" />}
          label="settings"
        />
        <MenuItem
          icon={<User className="h-4 w-4" />}
          label="profile"
        />
        <hr className="border-border my-1" />
        <MenuItem
          label="delete"
          variant="destructive"
        />
      </div>
    </DemoSection>
  );
}
