/**
 * Help overlay showing 3D navigation controls
 */
export function Controls3DHelp() {
  return (
    <div className="pointer-events-auto absolute top-4 right-4 flex flex-col gap-2 rounded-lg border border-border/50 bg-background/90 px-3 py-2 text-xs backdrop-blur">
      <div className="font-mono font-bold text-primary">🎮 3D Controls</div>
      <div className="flex flex-col gap-1 font-mono text-muted-foreground">
        <div>
          <span className="text-cyan-400">WASD</span> - Move XY
        </div>
        <div>
          <span className="text-cyan-400">↑↓</span> - Depth (Z-axis)
        </div>
        <div>
          <span className="text-cyan-400">Ctrl+Scroll</span> - Adjust depth
        </div>
        <div className="mt-1 border-t border-border/30 pt-1">
          <span className="text-cyan-400">Click node</span> - Select
        </div>
      </div>
    </div>
  );
}
