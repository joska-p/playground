export function ApiTable({
  rows
}: {
  rows: { prop: string; type: string; default: string; notes?: string }[];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-xs">
        <thead>
          <tr className="border-border border-b">
            <th className="text-foreground-muted px-3 py-2 text-left font-medium">Prop</th>
            <th className="text-foreground-muted px-3 py-2 text-left font-medium">Type</th>
            <th className="text-foreground-muted px-3 py-2 text-left font-medium">Default</th>
            <th className="text-foreground-muted px-3 py-2 text-left font-medium">Notes</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr
              key={r.prop}
              className="border-border border-b"
            >
              <td className="text-foreground px-3 py-2 font-mono">{r.prop}</td>
              <td className="text-foreground-muted px-3 py-2 font-mono">{r.type}</td>
              <td className="text-foreground-dim px-3 py-2 font-mono">{r.default}</td>
              <td className="text-foreground-dim px-3 py-2">{r.notes ?? ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
