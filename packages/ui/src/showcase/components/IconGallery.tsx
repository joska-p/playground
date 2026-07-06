import { Icon } from '../../components/icons';
import { DemoSection } from '../layout/DemoSection';

const ICON_NAMES = [
  'color',
  'generative',
  'flame',
  'simulation',
  'data-viz',
  'particles',
  'automa',
  'palette',
  'sparkles',
  'infinity',
  'book',
  'code'
];

export function IconGallery() {
  return (
    <DemoSection
      id="component-icon"
      title="Icon"
      intro={
        '44 hand-crafted SVG icons. Use the &lt;Icon name="..." /&gt; component or import individual icons from iconMap. Create your own with createIcon().'
      }
      code={`<Icon name="color" className="h-5 w-5" />`}
    >
      <div className="flex flex-wrap gap-4">
        {ICON_NAMES.map((name) => (
          <div
            key={name}
            className="flex flex-col items-center gap-1.5"
          >
            <div className="bg-surface-raised flex size-10 items-center justify-center rounded-lg shadow-xs">
              <Icon
                name={name as never}
                className="h-5 w-5"
              />
            </div>
            <span className="text-foreground-dim text-[10px]">{name}</span>
          </div>
        ))}
      </div>
    </DemoSection>
  );
}
