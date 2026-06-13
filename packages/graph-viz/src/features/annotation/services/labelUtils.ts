/**
 * Shorten a label for display: strip path prefix, keep last segment.
 * If label looks like a file path, shows just the filename.
 * Falls back to the raw label when it has no path separators.
 */
export function shortenLabel(label: string): string {
  const parts = label.split('/');
  return parts[parts.length - 1] ?? label;
}
