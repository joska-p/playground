import { CodeBlock } from '../layout/CodeBlock';
import { DocHeading } from '../layout/DocHeading';
import { Prose } from '../layout/Prose';

export function SetupSection() {
  return (
    <section
      id="setup"
      className="space-y-6"
    >
      <DocHeading level="h2">2. Installation &amp; setup</DocHeading>
      <Prose>
        <p>Install the package and its peer dependencies:</p>
      </Prose>
      <CodeBlock
        code={`pnpm add @repo/ui class-variance-authority clsx tailwind-merge lucide-react`}
      />
      <Prose>
        <p>
          <strong>Step 1</strong> — import the stylesheet once at your app root:
        </p>
      </Prose>
      <CodeBlock code={`import "@repo/ui/styles";`} />
      <Prose>
        <p>
          The stylesheet is Tailwind v4 CSS-first config — no tailwind.config.js. It defines the
          gruvbox color tokens for dark (:root) and light (html[data-theme="light"]), plus every
          CSS-only interactive behavior the components rely on.
        </p>
        <p>
          <strong>Step 2</strong> — wire up stateful providers. State lives in hooks; providers just
          relay it:
        </p>
      </Prose>
      <CodeBlock
        code={`import { ThemeProvider, useThemeState, ToastProvider, useToastQueue } from "@repo/ui";

export default function App() {
  const theme = useThemeState();
  const toastQueue = useToastQueue();

  return (
    <ThemeProvider theme={theme.theme} setTheme={theme.setTheme} toggleTheme={theme.toggleTheme}>
      <ToastProvider toasts={toastQueue.toasts} toast={toastQueue.toast} dismiss={toastQueue.dismiss}>
        <AppContent />
      </ToastProvider>
    </ThemeProvider>
  );
}`}
      />
      <Prose>
        <p>
          Both providers are optional. Dark is the CSS :root default, so an app that never renders
          ThemeProvider still gets the full dark theme.
        </p>
      </Prose>
    </section>
  );
}
