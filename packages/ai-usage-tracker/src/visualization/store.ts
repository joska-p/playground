import { create } from "zustand";
import type { UsageRecord, SessionData } from "../tracking/types.js";
import { getUsageData } from "../tracking/index.js";

interface UsageStore {
  records: UsageRecord[];
  isLoading: boolean;
  error: string | null;
  loadData: () => void;
  getSessions: (windowHours: number) => SessionData[];
  getProviderTotals: () => Record<string, { cost: number; tokens: number }>;
  getTotalCost: () => number;
  getTotalTokens: () => number;
}

export const usageStore = create<UsageStore>((set, get) => ({
  records: [],
  isLoading: false,
  error: null,

  loadData: () => {
    try {
      set({ isLoading: true, error: null });
      const records = getUsageData();
      set({ records, isLoading: false });
    } catch (err) {
      set({ error: err instanceof Error ? err.message : "Failed to load data", isLoading: false });
    }
  },

  getSessions: (windowHours: number) => {
    const { records } = get();
    if (records.length === 0) return [];

    const sorted = [...records].sort(
      (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );

    const sessions: SessionData[] = [];
    let currentSession: UsageRecord[] = [];
    let sessionStart: string | null = null;

    for (const record of sorted) {
      if (!sessionStart) {
        sessionStart = record.timestamp;
        currentSession = [record];
        continue;
      }

      const timeDiff = new Date(record.timestamp).getTime() - new Date(sessionStart).getTime();
      const hoursDiff = timeDiff / (1000 * 60 * 60);

      if (hoursDiff <= windowHours) {
        currentSession.push(record);
      } else {
        sessions.push({
          sessionStart: sessionStart!,
          sessionEnd: currentSession[currentSession.length - 1]?.timestamp || sessionStart,
          records: currentSession,
          totalCost: currentSession.reduce((sum: number, r: UsageRecord) => sum + r.cost, 0),
          totalTokens: currentSession.reduce(
            (sum: number, r: UsageRecord) => sum + r.inputTokens + r.outputTokens,
            0
          ),
        });
        sessionStart = record.timestamp;
        currentSession = [record];
      }
    }

    if (currentSession.length > 0) {
      sessions.push({
        sessionStart: sessionStart!,
        sessionEnd: currentSession[currentSession.length - 1]?.timestamp || sessionStart!,
        records: currentSession,
        totalCost: currentSession.reduce((sum: number, r: UsageRecord) => sum + r.cost, 0),
        totalTokens: currentSession.reduce(
          (sum: number, r: UsageRecord) => sum + r.inputTokens + r.outputTokens,
          0
        ),
      });
    }

    return sessions;
  },

  getProviderTotals: () => {
    const { records } = get();
    const totals: Record<string, { cost: number; tokens: number }> = {};

    for (const record of records) {
      if (!totals[record.provider]) {
        totals[record.provider] = { cost: 0, tokens: 0 };
      }
      const providerData = totals[record.provider]!;
      providerData.cost += record.cost;
      providerData.tokens += record.inputTokens + record.outputTokens;
    }

    return totals;
  },

  getTotalCost: () => {
    const { records } = get();
    return records.reduce((sum: number, r: UsageRecord) => sum + r.cost, 0);
  },

  getTotalTokens: () => {
    const { records } = get();
    return records.reduce((sum: number, r: UsageRecord) => sum + r.inputTokens + r.outputTokens, 0);
  },
}));
