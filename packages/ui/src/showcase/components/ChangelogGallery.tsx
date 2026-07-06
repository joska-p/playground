import { ChangelogItem } from '../../components/data-display';
import { DemoSection } from '../layout/DemoSection';

export function ChangelogGallery() {
  return (
    <DemoSection
      id="component-changelogitem"
      title="ChangelogItem"
      intro="A version + description pair for changelogs. The version label is colored via variant."
      apiRows={[
        { prop: 'version', type: 'string', default: 'required' },
        { prop: 'variant', type: 'ColorVariant', default: '"primary"' }
      ]}
      code={`<ChangelogItem variant="primary" version="v2.0">description</ChangelogItem>`}
    >
      <div className="max-w-sm space-y-2">
        <ChangelogItem
          variant="primary"
          version="v2.0"
        >
          complete rewrite — stateless components, hooks, gruvbox theme.
        </ChangelogItem>
        <ChangelogItem
          variant="accent"
          version="v1.3"
        >
          semantic colors, popover, carousel.
        </ChangelogItem>
        <ChangelogItem
          variant="secondary"
          version="v1.0"
        >
          initial release with button, badge, input, dialog.
        </ChangelogItem>
      </div>
    </DemoSection>
  );
}
