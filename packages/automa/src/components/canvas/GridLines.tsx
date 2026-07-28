type GridLinesProps = {
  cols: number;
  rows: number;
};

function GridLines({ cols, rows }: GridLinesProps) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        backgroundImage: `
          repeating-linear-gradient(
            to right,
            rgba(255,255,255,0.15) 0px,
            rgba(255,255,255,0.15) 1px,
            transparent 1px,
            transparent calc(100% / ${String(cols)})
          ),
          repeating-linear-gradient(
            to bottom,
            rgba(255,255,255,0.15) 0px,
            rgba(255,255,255,0.15) 1px,
            transparent 1px,
            transparent calc(100% / ${String(rows)})
          )
        `
      }}
    />
  );
}

export { GridLines };
