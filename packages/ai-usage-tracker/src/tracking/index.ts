import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import { UsageRecord, BudgetConfig } from "./types.js";

const DATA_DIR = join(homedir(), ".ai-usage-tracker");
const DATA_FILE = join(DATA_DIR, "data.json");
const BUDGET_FILE = join(DATA_DIR, "budgets.json");

export function initTracker(): void {
  if (!existsSync(DATA_DIR)) {
    mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!existsSync(BUDGET_FILE)) {
    writeFileSync(BUDGET_FILE, "{}", "utf-8");
  }
}

function loadData(): UsageRecord[] {
  if (!existsSync(DATA_FILE)) {
    return [];
  }
  const content = readFileSync(DATA_FILE, "utf-8");
  if (!content.trim()) {
    return [];
  }
  return JSON.parse(content) as UsageRecord[];
}

function saveData(records: UsageRecord[]): void {
  if (!existsSync(DATA_DIR)) {
    mkdirSync(DATA_DIR, { recursive: true });
  }
  writeFileSync(DATA_FILE, JSON.stringify(records, null, 2), "utf-8");
}

export function trackUsage(data: {
  provider: string;
  model: string;
  inputTokens: number;
  outputTokens: number;
  cost: number;
  requestType: string;
  timestamp?: string;
}): UsageRecord {
  initTracker();

  const record: UsageRecord = {
    id: crypto.randomUUID(),
    provider: data.provider,
    model: data.model,
    inputTokens: data.inputTokens,
    outputTokens: data.outputTokens,
    cost: data.cost,
    requestType: data.requestType,
    timestamp: data.timestamp || new Date().toISOString(),
  };

  const records = loadData();
  records.push(record);
  saveData(records);

  return record;
}

export function getUsageData(): UsageRecord[] {
  initTracker();
  return loadData();
}

export function getBudgets(): BudgetConfig {
  if (!existsSync(BUDGET_FILE)) {
    return {};
  }
  const content = readFileSync(BUDGET_FILE, "utf-8");
  if (!content.trim()) {
    return {};
  }
  return JSON.parse(content) as BudgetConfig;
}

export function setBudget(provider: string, amount: number): void {
  initTracker();
  const budgets = getBudgets();
  budgets[provider] = amount;
  writeFileSync(BUDGET_FILE, JSON.stringify(budgets, null, 2), "utf-8");
}
