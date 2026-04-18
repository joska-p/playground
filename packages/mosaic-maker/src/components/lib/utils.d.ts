import type { z } from "zod";
export declare const shuffleArray: <T>(array: T[]) => T[];
export declare const shuffleObject: <T extends Record<string, unknown>>(object: T) => T;
export declare const getRandom: <T>(array: T[]) => T;
export declare const safeFetch: <TData>(url: string, scheme: z.ZodSchema<TData>) => Promise<TData>;
export declare const getRandomValue: (obj: Record<string, unknown>) => string;
export declare const stall: (ms: number) => Promise<unknown>;
//# sourceMappingURL=utils.d.ts.map