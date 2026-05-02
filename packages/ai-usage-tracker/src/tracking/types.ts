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
