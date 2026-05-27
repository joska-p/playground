import { create } from "zustand";

export type Submission = {
  text: string;
  timestamp: number;
};

type DemoStore = {
  count: number;
  lastMessage: string;
  submissions: Submission[];
};

const demoStore = create<DemoStore>(() => ({
  count: 0,
  lastMessage: "",
  submissions: [],
}));

export function useDemoCount(): number {
  return demoStore((s) => s.count);
}

export function useDemoLastMessage(): string {
  return demoStore((s) => s.lastMessage);
}

export function useDemoSubmissions(): Submission[] {
  return demoStore((s) => s.submissions);
}

export function addDemoSubmission(text: string): void {
  const submission: Submission = { text, timestamp: Date.now() };
  demoStore.setState((s) => ({
    count: s.count + 1,
    lastMessage: text,
    submissions: [...s.submissions, submission],
  }));
}

export function resetDemo(): void {
  demoStore.setState({ count: 0, lastMessage: "", submissions: [] });
}
