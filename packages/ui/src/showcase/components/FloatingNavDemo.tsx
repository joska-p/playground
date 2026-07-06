import { DemoSection } from '../layout/DemoSection';

export function FloatingNavDemo() {
  return (
    <DemoSection
      id="component-floatingnav"
      title="FloatingNav"
      intro="Fixed-position navigation bar with auto-hide on scroll. Shows at page top, disappears after 1.5s of idle scrolling, reappears on scroll-up, hover, or when scrolled near the top. Brand text color via variant."
      apiRows={[
        { prop: 'brand', type: '{ label, href }', default: 'required' },
        { prop: 'links', type: 'NavLink[]', default: 'required', notes: '{ label, href }[]' },
        {
          prop: 'themeToggle',
          type: 'ReactNode',
          default: '—',
          notes: 'slot for dark/light toggle'
        },
        { prop: 'variant', type: 'ColorVariant', default: '"primary"', notes: 'brand text color' }
      ]}
      code={`import { FloatingNav, useTheme } from 'pg-lab-ui/ui';

<FloatingNav
  brand={{ label: 'pg_lab-ui', href: '#' }}
  links={[
    { label: 'philosophy', href: '#philosophy' },
    { label: 'setup', href: '#setup' },
    { label: 'components', href: '#components' }
  ]}
  themeToggle={<ThemeToggleButton />}
/>`}
    >
      <p className="text-foreground-muted text-sm">
        <strong>Note:</strong> FloatingNav is a page-level component — it is currently active at the
        top of this page. Scroll down to see it auto-hide, then scroll up or hover near the top to
        bring it back.
      </p>
    </DemoSection>
  );
}
