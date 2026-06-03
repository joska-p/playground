import { Drawing } from "./Drawing.tsx";
import type { Paths } from "../../core/drawing.types.ts";

type SessionProps = {
  drawings: Record<string, Paths>;
};

function Session({ drawings }: SessionProps) {
  return (
    <div className="grid grid-cols-8 gap-4 w-full">
      {Object.entries(drawings).map(([label, paths]) => (
        <Drawing key={label} paths={paths} />
      ))}
    </div>
  );
}

export { Session };
