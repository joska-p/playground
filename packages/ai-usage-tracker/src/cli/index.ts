#!/usr/bin/env node
import { existsSync, readFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import chalk from "chalk";

const DATA_DIR = join(homedir(), ".ai-usage-tracker");
const DATA_FILE = join(DATA_DIR, "data.json");
const BUDGET_FILE = join(DATA_DIR, "budgets.json");

interface UsageRecord {
  id: string;
  provider: string;
  model: string;
  inputTokens: number;
  outputTokens: number;
  cost: number;
  requestType: string;
  timestamp: string;
}

interface BudgetConfig {
  [provider: string]: number;
}

function loadData(): UsageRecord[] {
  if (!existsSync(DATA_FILE)) {
    return [];
  }
  const content = readFileSync(DATA_FILE, "utf-8");
  return content.trim() ? JSON.parse(content) : [];
}

function loadBudgets(): BudgetConfig {
  if (!existsSync(BUDGET_FILE)) {
    return {};
  }
  const content = readFileSync(BUDGET_FILE, "utf-8");
  return content.trim() ? JSON.parse(content) : {};
}

function printSummary(): void {
  const records = loadData();

  if (records.length === 0) {
    console.log(chalk.yellow("No usage data yet."));
    return;
  }

  const totalCost = records.reduce((sum: number, r: UsageRecord) => sum + r.cost, 0);
  const totalTokens = records.reduce(
    (sum: number, r: UsageRecord) => sum + r.inputTokens + r.outputTokens,
    0
  );
  const providerTotals: Record<string, { cost: number; tokens: number }> = {};

  for (const record of records) {
    if (!providerTotals[record.provider]) {
      providerTotals[record.provider] = { cost: 0, tokens: 0 };
    }
    const providerData = providerTotals[record.provider]!;
    providerData.cost += record.cost;
    providerData.tokens += record.inputTokens + record.outputTokens;
  }

  console.log(chalk.bold.blue("\n=== AI Usage Summary ===\n"));
  console.log(chalk.bold(`Total Cost: ${chalk.green("$" + totalCost.toFixed(4))}`));
  console.log(chalk.bold(`Total Tokens: ${chalk.cyan(totalTokens.toLocaleString())}`));
  console.log(chalk.bold(`Total Requests: ${chalk.yellow(records.length)}\n`));

  console.log(chalk.bold("By Provider:"));
  console.log(chalk.gray("─".repeat(50)));
  for (const [provider, { cost, tokens }] of Object.entries(providerTotals)) {
    console.log(
      `${chalk.bold(provider.padEnd(15))} $${cost.toFixed(4).padEnd(10)} ${tokens.toLocaleString()} tokens`
    );
  }
  console.log();
}

function printList(): void {
  const records = loadData();

  if (records.length === 0) {
    console.log(chalk.yellow("No usage data yet."));
    return;
  }

  console.log(chalk.bold.blue("\n=== Usage Records ===\n"));
  console.log(
    chalk.gray("ID".padEnd(10)),
    chalk.gray("Provider".padEnd(12)),
    chalk.gray("Model".padEnd(20)),
    chalk.gray("Cost".padEnd(10)),
    chalk.gray("Tokens")
  );
  console.log(chalk.gray("─".repeat(70)));

  for (const r of records.slice(-20)) {
    const shortId = r.id?.substring(0, 8) || "";
    console.log(
      chalk.cyan(shortId.padEnd(10)),
      r.provider?.padEnd(12) || "",
      r.model?.padEnd(20) || "",
      chalk.green("$" + r.cost.toFixed(4).padEnd(10)),
      chalk.yellow((r.inputTokens + r.outputTokens).toString())
    );
  }

  if (records.length > 20) {
    console.log(chalk.gray(`\n... showing last 20 of ${records.length} records`));
  }
  console.log();
}

function printBudgets(): void {
  const records = loadData();
  const budgets = loadBudgets();

  if (Object.keys(budgets).length === 0) {
    console.log(
      chalk.yellow("No budgets configured. Run: ai-usage-tracker set-budget <provider> <amount>")
    );
    return;
  }

  const providerTotals: Record<string, number> = {};
  for (const record of records) {
    providerTotals[record.provider] = (providerTotals[record.provider] || 0) + record.cost;
  }

  console.log(chalk.bold.blue("\n=== Budget Status ===\n"));
  console.log(
    chalk.gray("Provider".padEnd(15)),
    chalk.gray("Budget".padEnd(12)),
    chalk.gray("Spent".padEnd(12)),
    chalk.gray("Remaining")
  );
  console.log(chalk.gray("─".repeat(55)));

  for (const [provider, budget] of Object.entries(budgets)) {
    const budgetAmount = budget as number;
    const spent = providerTotals[provider] || 0;
    const remaining = budgetAmount - spent;
    const status =
      remaining < 0 ? chalk.red(remaining.toFixed(4)) : chalk.green(remaining.toFixed(4));

    console.log(
      chalk.cyan(provider.padEnd(15)),
      chalk.yellow("$" + budgetAmount.toFixed(2).padEnd(12)),
      chalk.green("$" + spent.toFixed(4).padEnd(12)),
      status
    );
  }
  console.log();
}

const command = process.argv[2];

switch (command) {
  case "summary":
  case undefined:
    printSummary();
    break;
  case "list":
    printList();
    break;
  case "budgets":
    printBudgets();
    break;
  default:
    console.log(chalk.red(`Unknown command: ${command}`));
    console.log(chalk.yellow("Usage: ai-usage-tracker [summary|list|budgets]"));
    process.exit(1);
}
