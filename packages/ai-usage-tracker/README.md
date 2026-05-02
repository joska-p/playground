# AI Usage Tracker

Track and visualize AI provider usage across different providers (Anthropic, Google, OpenAI, etc.).

## Features

- **Manual Usage Tracking**: Call `trackUsage()` after each AI API request
- **Local Storage**: Data stored in `~/.ai-usage-tracker/data.json`
- **Per-Provider Budgets**: Configure budget limits in `budgets.json`
- **Visualization Dashboard**: React components with D3 charts
- **CLI Tool**: View usage stats from terminal

## Installation

```bash
pnpm install
pnpm build
```

## Usage

### Tracking Usage

```typescript
import { initTracker, trackUsage } from "@repo/ai-usage-tracker";

// Initialize (creates ~/.ai-usage-tracker/ directory)
initTracker();

// Log usage after an AI API call
const record = trackUsage({
  provider: "anthropic",
  model: "claude-3-opus",
  inputTokens: 1500,
  outputTokens: 800,
  cost: 0.0375,
  requestType: "chat",
  // timestamp is optional, defaults to now
});
```

### Setting Budgets

```typescript
import { setBudget } from "@repo/ai-usage-tracker";

setBudget("anthropic", 100); // $100 budget
setBudget("google", 50); // $50 budget
```

### Using Visualization Components

```tsx
import { Dashboard, CostByProvider, UsageOverTime } from "@repo/ai-usage-tracker";

function App() {
  return (
    <div>
      <h1>My AI Usage</h1>
      <Dashboard />
      {/* Or use individual components */}
      <CostByProvider />
      <UsageOverTime />
    </div>
  );
}
```

### CLI

```bash
# View summary
ai-usage-tracker summary

# List recent usage
ai-usage-tracker list

# Check budget status
ai-usage-tracker budgets
```

## Data Storage

- **Usage Data**: `~/.ai-usage-tracker/data.json`
- **Budgets**: `~/.ai-usage-tracker/budgets.json`

## Dashboard Components

| Component             | Description                           |
| --------------------- | ------------------------------------- |
| `<Dashboard />`       | Combined view with all charts         |
| `<CostByProvider />`  | Pie chart showing cost by provider    |
| `<UsageOverTime />`   | Line chart of usage over time         |
| `<SessionSummary />`  | Time-based sessions (2-hour windows)  |
| `<RequestLogTable />` | Sortable/filterable table of requests |
| `<BudgetTracker />`   | Per-provider budget progress          |

## Session Definition

A "session" is defined as all requests made within a 2-hour time window.

## License

MIT
