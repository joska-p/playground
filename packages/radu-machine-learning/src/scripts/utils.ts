function formatPercent(percent: number) {
  const percentStr = (percent * 100).toFixed(2);
  return `${percentStr}%`;
}

function printProgress({ count, max }: { count: number; max: number }) {
  process.stdout.clearLine(0);
  process.stdout.cursorTo(0);

  const percent = formatPercent(count / max);
  process.stdout.write(`Progress: ${count} / ${max} (${percent})`);
}

export { printProgress };
