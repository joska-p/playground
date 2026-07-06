import { ErrorBoundary } from '../../components/feedback';
import { DemoSection } from '../layout/DemoSection';

function throwErrorDemo() {
  throw new Error('this widget always crashes — demo purposes only.');
}

function BuggyWidget() {
  throwErrorDemo();
  return <p>this widget always crashes — demo purposes only.</p>;
}

export function ErrorBoundaryDemo() {
  return (
    <DemoSection
      id="component-errorboundary"
      title="ErrorBoundary"
      intro="Catches React render errors and shows a themed fallback. Custom fallback renderer and onError callback supported."
      apiRows={[
        { prop: 'variant', type: 'ColorVariant', default: '"destructive"' },
        { prop: 'onError', type: '(error: Error) => void', default: '—' },
        { prop: 'fallback', type: 'FallbackRenderer', default: 'DefaultFallback' }
      ]}
      code={`<ErrorBoundary variant="destructive" onError={(e) => console.error(e)}>
  <BuggyWidget />
</ErrorBoundary>`}
    >
      <ErrorBoundary
        variant="destructive"
        onError={(e) => {
          console.error(e);
        }}
      >
        <BuggyWidget />
      </ErrorBoundary>
    </DemoSection>
  );
}
