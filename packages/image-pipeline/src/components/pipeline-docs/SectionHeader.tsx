import { CodeBlock } from "./CodeBlock";

function SectionHeader({ title, code }: { title: string; code: string }) {
  return (
    <div className="mb-6">
      <h2 className="mb-2 text-2xl font-bold">{title}</h2>
      <CodeBlock code={code} />
    </div>
  );
}

export { SectionHeader };
