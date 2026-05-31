function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="bg-muted/50 border-border max-w-full overflow-x-auto rounded-lg border p-4 font-mono text-xs leading-relaxed">
      <code>{code}</code>
    </pre>
  );
}

export { CodeBlock };
