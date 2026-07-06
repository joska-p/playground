export function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="bg-surface border-border max-h-80 overflow-x-auto rounded-lg border p-4 text-xs leading-relaxed">
      <code>{code}</code>
    </pre>
  );
}
