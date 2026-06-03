type Paths = number[][][];

type SessionData = {
  session: number;
  student: string;
  drawings: Record<string, Paths>;
};

export type { Paths, SessionData };
