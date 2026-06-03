import { Drawing } from "./drawing";

type SessionProps = {
  drawings: {
    [key: string]: number[][][];
  };
};

const Session = ({ drawings }: SessionProps) => {
  return (
    <div className="grid grid-cols-8 gap-4 w-full">
      {Object.entries(drawings).map(([label, paths]) => (
        <Drawing key={label} paths={paths} />
      ))}
    </div>
  );
};

export { Session };
