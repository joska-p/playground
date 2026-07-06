import { DemoSection } from '../layout/DemoSection';

export function HooksSection() {
  return (
    <DemoSection
      id="hooks"
      title="7. Hooks reference"
      intro="All stateful hooks in the library. Components never call useState — hooks do."
    >
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-xs">
          <thead>
            <tr className="border-border border-b">
              <th className="text-foreground-muted px-3 py-2 text-left font-medium">Hook</th>
              <th className="text-foreground-muted px-3 py-2 text-left font-medium">Returns</th>
              <th className="text-foreground-muted px-3 py-2 text-left font-medium">Used by</th>
            </tr>
          </thead>
          <tbody>
            {[
              [
                'useThemeState(defaultTheme?, persist?)',
                '{ theme, setTheme, toggleTheme }',
                'ThemeProvider'
              ],
              ['useTheme()', '{ theme, setTheme, toggleTheme }', 'any consumer'],
              ['useToastQueue()', '{ toasts, toast, dismiss }', 'ToastProvider'],
              ['useToast()', '{ toast, dismiss }', 'any consumer'],
              ['useTabsState(defaultValue)', '{ value, setValue }', 'Tabs'],
              [
                'useFloatingNavState()',
                '{ visible, navHoveredRef, show, scheduleHide }',
                'FloatingNav'
              ],
              ['useSidebarState(defaultOpen?)', '{ isOpen, toggle, open, close }', 'Sidebar'],
              ['useScrollRevealState(threshold?)', '{ ref, visible }', 'ScrollReveal'],
              ['useResizeObserver(debounceMs?)', '[ref, { width, height }]', 'any']
            ].map(([hook, returns, usedBy]) => (
              <tr
                key={hook}
                className="border-border border-b"
              >
                <td className="text-foreground px-3 py-2 font-mono">{hook}</td>
                <td className="text-foreground-muted px-3 py-2 font-mono">{returns}</td>
                <td className="text-foreground-dim px-3 py-2">{usedBy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DemoSection>
  );
}
