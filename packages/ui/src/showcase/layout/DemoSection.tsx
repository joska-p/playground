import { ApiTable } from './ApiTable';
import { CodeBlock } from './CodeBlock';
import { DocHeading } from './DocHeading';
import { Prose } from './Prose';

export function DemoSection({
  id,
  title,
  intro,
  code,
  apiRows,
  children
}: {
  id?: string;
  title: string;
  intro?: string;
  code?: string;
  apiRows?: { prop: string; type: string; default: string; notes?: string }[];
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="relative space-y-4"
    >
      <DocHeading level="h3">{title}</DocHeading>
      {intro && (
        <Prose>
          <p>{intro}</p>
        </Prose>
      )}
      {apiRows && <ApiTable rows={apiRows} />}
      {code && <CodeBlock code={code} />}
      <div className="pt-2">{children}</div>
    </section>
  );
}
