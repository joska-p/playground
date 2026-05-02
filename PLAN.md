# Implementation Plan: @repo/ai-usage-tracker

## Overview
Create a new package `packages/ai-usage-tracker` for tracking AI provider usage and visualizing the data.

## Package Structure
```
packages/ai-usage-tracker/
├── package.json
├── tsconfig.json
├── src/
│   ├── index.ts                    # Main exports
│   ├── tracking/
│   │   ├── index.ts                # initTracker(), trackUsage()
│   │   └── types.ts               # UsageRecord, BudgetConfig types
│   ├── visualization/
│   │   ├── store.ts                # Zustand store
│   │   ├── components.tsx          # React components (D3 + React)
│   │   └── charts.ts              # D3 chart utilities
│   └── cli/
│       └── index.ts                # CLI: ai-usage-tracker [summary|list|budgets]
└── README.md
```

## Step 1: Create package.json
- Name: `@repo/ai-usage-tracker`
- Extend `@repo/typescript-config`
- Dependencies: `zustand`, `zod`
- DevDependencies: `@repo/eslint-config`, `@repo/typescript-config`, `typescript`, `@types/react`
- PeerDependencies: `react`
- Add `bin`: `ai-usage-tracker`

## Step 2: Create TypeScript Types (`src/tracking/types.ts`)
```typescript
export interface UsageRecord {
  id: string
  provider: string
  model: string
  inputTokens: number
  outputTokens: number
  cost: number
  requestType: string
  timestamp: string
}

export interface BudgetConfig {
  [provider: string]: number
}

export interface SessionData {
  sessionStart: string
  sessionEnd: string
  records: UsageRecord[]
  totalCost: number
  totalTokens: number
}
```

## Step 3: Implement Tracking (`src/tracking/index.ts`)
- `initTracker()`: Create `~/.ai-usage-tracker/` directory and empty `budgets.json`
- `trackUsage(data)`: Generate UUID, save to `~/.ai-usage-tracker/data.json`, return saved record
- Use `crypto.randomUUID()` for IDs
- Read/writes to `~/.ai-usage-tracker/data.json` (single JSON array)

## Step 4: Create Zustand Store (`src/visualization/store.ts`)
- `usageStore`: Reads from JSON file (no persistence)
- Actions: `loadData()`, `getData()`, `getSessions(windowHours: number)`
- Polling support via `startPolling(intervalMs: number)`

## Step 5: Build Visualization Components (`src/visualization/components.tsx`)
- `<Dashboard />` - Combined view with all charts + filters
- `<CostByProvider />` - Pie/bar chart (D3 + React)
- `<UsageOverTime />` - Line chart (D3 + React)
- `<SessionSummary />` - Time-based sessions (2-hour window)
- `<RequestLogTable />` - Sortable/filterable table
- `<BudgetTracker />` - Per-provider budget progress bars
- Filter UI: date range, provider dropdown, model search
- Filter state via URL query params

## Step 6: Implement D3 Charts (`src/visualization/charts.ts`)
- Follow existing pattern from `packages/sequence-renderer` or `piechart.ts`
- Reusable D3 chart functions that work with React refs

## Step 7: Build CLI (`src/cli/index.ts`)
- Command: `ai-usage-tracker`
- Subcommands: `summary`, `list`, `budgets`
- Output: Pretty ASCII tables with colors (use `chalk` or similar)
- Reads from `~/.ai-usage-tracker/data.json` and `budgets.json`

## Step 8: Main Exports (`src/index.ts`)
```typescript
export { initTracker, trackUsage } from './tracking'
export type { UsageRecord, BudgetConfig } from './tracking/types'
export { usageStore } from './visualization/store'
export { Dashboard, CostByProvider, UsageOverTime, SessionSummary, RequestLogTable, BudgetTracker } from './visualization/components'
```

## Step 9: Update Root turbo.json
- Add `packages/ai-usage-tracker` to workspace (already covered by `packages/*`)

## Step 10: Install and Build
- Run `pnpm install` to link new package
- Run `pnpm build` to verify compilation
- Run `pnpm lint` and `pnpm check-types`

## Key Design Decisions
| Decision | Choice |
|----------|--------|
| Storage | `~/.ai-usage-tracker/data.json` (single JSON array) |
| Budgets | `~/.ai-usage-tracker/budgets.json` (flat key-value) |
| ID generation | `crypto.randomUUID()` |
| Record structure | Flat: { id, provider, model, inputTokens, outputTokens, cost, requestType, timestamp } |
| Session window | 2 hours |
| Filter state | URL query params |
| Budget exceeded | Warning only |
| Missing data | Show empty state |
| CLI output | Colored ASCII tables |
| Polling | Configurable interval |
