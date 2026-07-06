import { ColorSwatch } from '../..';
import { DocHeading } from '../layout/DocHeading';
import { Prose } from '../layout/Prose';

export function DesignTokensSection() {
  return (
    <section
      id="tokens"
      className="space-y-6"
    >
      <DocHeading level="h2">3. Design Tokens</DocHeading>
      <Prose>
        <p>
          All tokens are CSS custom properties, re-exposed to Tailwind via @theme inline so they are
          usable as ordinary utility classes (bg-primary, text-foreground-muted, border-border, …).
        </p>
      </Prose>

      <DocHeading level="h3">3.1 Semantic tokens</DocHeading>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-xs">
          <thead>
            <tr className="border-border border-b">
              <th className="text-foreground-muted px-3 py-2 text-left font-medium">Token</th>
              <th className="text-foreground-muted px-3 py-2 text-left font-medium">Dark</th>
              <th className="text-foreground-muted px-3 py-2 text-left font-medium">Light</th>
              <th className="text-foreground-muted px-3 py-2 text-left font-medium">Foreground</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['--background', '#1d2021', '#fbf1c7', '—'],
              ['--surface', '#282828', '#f2e5bc', '—'],
              ['--surface-raised', '#3c3836', '#ebdbb2', '—'],
              ['--foreground', '#ebdbb2', '#3c3836', '—'],
              ['--foreground-muted', '#a89984', '#665c54', '—'],
              ['--foreground-dim', '#665c54', '#928374', '—'],
              ['--border', 'rgba(235,219,178,.07)', 'rgba(60,56,54,.1)', '—'],
              ['--primary', '#83a598', '#076678', '--primary-foreground'],
              ['--secondary', '#b8bb26', '#79740e', '--secondary-foreground'],
              ['--accent', '#d3869b', '#8f3f71', '--accent-foreground'],
              ['--warning', '#fabd2f', '#b57614', '--warning-foreground'],
              ['--destructive', '#fb4934', '#9d0006', '--destructive-foreground']
            ].map(([token, dark, light, fg]) => (
              <tr
                key={token}
                className="border-border border-b"
              >
                <td className="text-foreground px-3 py-2 font-mono">{token}</td>
                <td className="text-foreground-muted px-3 py-2 font-mono">{dark}</td>
                <td className="text-foreground-muted px-3 py-2 font-mono">{light}</td>
                <td className="text-foreground-dim px-3 py-2 font-mono">{fg}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Prose>
        <p>
          Switching theme is one attribute: &lt;html data-theme="light"&gt; (absence of the
          attribute = dark). ThemeProvider / useThemeState do this for you and persist the choice to
          localStorage.
        </p>
      </Prose>

      <DocHeading level="h3">3.2 Raw palette</DocHeading>
      <Prose>
        <p>Used in badges, charts, generative content — not for UI variant props.</p>
      </Prose>
      <div className="flex flex-wrap gap-3">
        {[
          ['--red', '#cc241d'],
          ['--green', '#98971a'],
          ['--yellow', '#d79921'],
          ['--blue', '#458588'],
          ['--purple', '#b16286'],
          ['--aqua', '#689d6a'],
          ['--orange', '#d65d0e']
        ].map(([token]) => (
          <ColorSwatch
            key={token}
            color={`var(${token})`}
            name={token?.replace('--', '') ?? String(token)}
            token={token}
            size="sm"
          />
        ))}
      </div>

      <DocHeading level="h3">3.3 Elevation &amp; shape</DocHeading>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-xs">
          <thead>
            <tr className="border-border border-b">
              <th className="text-foreground-muted px-3 py-2 text-left font-medium">Token</th>
              <th className="text-foreground-muted px-3 py-2 text-left font-medium">Usage</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['--shadow-sm / --shadow-md / --shadow-lg', 'Card, Dialog, toast elevation'],
              ['rounded-md', 'Inputs, buttons'],
              ['rounded-lg', 'Cards, panels, dialogs'],
              ['rounded-full', 'Pills, avatars, floating nav'],
              ['JetBrains Mono (monospace-only)', '--font-sans and --font-mono are the same stack']
            ].map(([token, usage]) => (
              <tr
                key={token}
                className="border-border border-b"
              >
                <td className="text-foreground px-3 py-2 font-mono">{token}</td>
                <td className="text-foreground-muted px-3 py-2">{usage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
