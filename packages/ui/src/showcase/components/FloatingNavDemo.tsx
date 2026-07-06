import { FloatingNav } from '../..';
import { ThemeToggleButton } from '../layout/ThemeToggleButton';

export function FloatingNavDemo() {
  return (
    <section
      id="component-floatingnav"
      className="space-y-4"
    >
      <div className="bg-surface relative h-32 overflow-hidden rounded-lg border">
        <div className="pointer-events-none scale-75 transform opacity-60">
          <FloatingNav
            brand={{ label: 'pg_lab-ui', href: '#' }}
            links={[
              { label: 'philosophy', href: '#philosophy' },
              { label: 'setup', href: '#setup' },
              { label: 'components', href: '#components' }
            ]}
            themeToggle={<ThemeToggleButton />}
          />
        </div>
      </div>
    </section>
  );
}
