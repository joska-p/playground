import { FloatingNav } from '../components/navigation/floating-nav/FloatingNav';

export function AtlasNav() {
  return (
    <FloatingNav
      variant="accent"
      brand={{ label: '⬡ Atlas', href: '#' }}
      links={[
        { label: 'Regions', href: '#regions' },
        { label: 'Field Notes', href: '#notes' },
        { label: 'Expedition Log', href: '#log' }
      ]}
      className="fixed top-0 right-0 left-0 z-50"
    />
  );
}
